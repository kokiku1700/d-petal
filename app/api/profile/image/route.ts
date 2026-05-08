import { NextRequest } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { sql } from "@/lib/sql";
import { getSessionUser } from "@/lib/getSessionUser";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function PATCH ( req: NextRequest ) {
    try {
        const user = await getSessionUser();

        if ( !user ) {
            return Response.json(
                { ok: false, message: "로그인이 필요합니다." },
                { status: 401 }
            );
        };

        const formData = await req.formData();
        const image = formData.get("image");

        // 해당 변수가 File 객체인지 판단한다. 
        if ( !(image instanceof File)) {
            return Response.json(
                { ok: false, message: "이미지 파일이 없습니다." },
                { status: 400 },
            );
        };

        if ( !image.type.startsWith("image/")) {
            return Response.json(
                { ok: false, message: "이미지 파일만 업로드할 수 없습니다." },
                { status: 400 },
            );
        };

        if ( image.size > 1024 * 1024 * 5 ) {
            return Response.json(
                { ok: false, message: "이미지는 5MB 이하만 업로드할 수 있습니다."},
                { status: 400 }
            );
        };

        // 서버에서 받은 데이터는 파일 객체이기 때문에
        // 바이너리 데이터로 변환해줘야 한다. 
        const arrayBuffer = await image.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // cloudinary에 저장하는 코드. 
        const uploadedImage = await new Promise<{ secure_url: string }>((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                {
                    folder: "dpetal/profile",
                    resource_type: "image",
                },
                (error, result) => {
                    if ( error || !result ) {
                        reject(error);
                        return;
                    };

                    resolve({
                        secure_url: result.secure_url,
                    });
                },
                // end(buffer)는 cloudinary에 파일을 보낸다. 
                // 마지마게 실행되는게 아닌 가장 먼저 실행된다. 
                // 이 값으로 위 error 혹은 result를 반환하게 된다. 
            ).end(buffer);
        });

        await sql`
            update users
            set user_profile_image = ${uploadedImage.secure_url}
            where user_id = ${user.user_id}
        `;

        return Response.json({
            ok: true,
            message: "프로필 이미지가 변경되었습니다.",
            imageUrl: uploadedImage.secure_url,
        });
    } catch ( error ) {
        console.error("PROFILE_IMAGE_UPLOAD_ERROR", error);

        return Response.json(
            { ok: false, message: "프로필 이미지 업로드 중 오류가 발생했습니다."},
            { status: 500 },
        )
    };
};