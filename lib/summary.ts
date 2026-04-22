import { EmotionKey } from "@/constant/emotions";
import { sql } from "./sql";

type WeekPostTrend = {
    day: string;
    count: number;
};

type WeekSatifactionSummaryDetail = {
    satisfaction: number;
    count: number;
};

type WeekCategorySummaryDetail = {
    category_id: string;
    name: string;
    color: string;
    count: number;
};

type WeekEmotionSummaryDetail = {
    emotion: EmotionKey;
    count: number;
};

export async function getSummary ( id: number ) {
    const rows = await sql`
        with top_category as (
            select 
                c.name, c.color
            from posts p
            join categories c
                on p.category_id = c.category_id
            where p.user_id = ${id}
            group by c.category_id, c.name, c.color
            order by count(*) desc, c.name asc
            limit 1
        )
        select
            count(*)::int as count,
            coalesce(round(avg(satisfaction), 1), 0) as avg_satisfaction,
            (
                select emotion
                from posts
                where user_id = ${id}
                group by emotion
                order by count(*) desc
                limit 1
            ) as top_emotion,
            (select name from top_category) as top_category_name,
            (select color from top_category) as top_category_color
        from posts
        where user_id = ${id};
    `;

    return rows[0];
};

export async function getTodaySummaryDetail ( id: number ) {
    const rows = await sql`
        with today_posts as (
            select * 
            from posts
            where user_id = ${id}
                and date(created_at at time zone 'Asia/Seoul')
                    = date(now() at time zone 'Asia/Seoul')
        ),
        top_emotion as (
            select emotion
            from today_posts
            group by emotion
            order by count(*) desc
            limit 1
        )
        select
            count(*)::int as count,
            coalesce(round(avg(satisfaction), 1), 0) as avg_satisfaction,
            (select emotion from top_emotion) as top_emotion
        from today_posts;
    `;

    return rows[0];
};

export async function getWeekSummaryDetail ( id: number ) {
    const rows = await sql`
        with week_posts as (
            select * 
            from posts
            where user_id = ${id}
                and date(created_at at time zone 'Asia/Seoul')
                    between date(now() at time zone 'Asia/Seoul') - 6
                    and date(now() at time zone 'Asia/Seoul')
        ),
        top_emotion as (
            select emotion
            from week_posts
            group by emotion
            order by count(*) desc
            limit 1
        )
        select
            count(*)::int as count,
            coalesce(round(avg(satisfaction), 1), 0) as avg_satisfaction,
            (select emotion from top_emotion) as top_emotion
        from week_posts;
    `;

    return rows[0];
}

export async function getWeekPostTrend ( id: number ): Promise<WeekPostTrend[]> {
    const rows = await sql<WeekPostTrend[]>`
        with days as (
            select generate_series(
                date(now() at time zone 'Asia/Seoul') - 6,
                date(now() at time zone 'Asia/Seoul'),
                interval '1 day'
            )::date as day
        )
        select 
            d.day,
            coalesce(count(p.post_id), 0)::int as count
        from days d
        left join posts p
            on date(p.created_at at time zone 'Asia/Seoul') = d.day
            and p.user_id = ${id}
        group by d.day
        order by d.day asc;
    `;

    return rows;
};

export async function getWeekCategorySummaryDetail ( id: number ): Promise<WeekCategorySummaryDetail[]> {
    const rows = await sql<WeekCategorySummaryDetail[]>`
        select 
            c.category_id,
            c.name,
            c.color,
            count(p.post_id):: int as count
        from posts p
        join categories c
            on p.category_id = c.category_id
        where p.user_id = ${id}
            and date(p.created_at at time zone 'Asia/Seoul')
                between date(now() at time zone 'Asia/Seoul') - 6
                and date(now() at time zone 'Asia/Seoul')
        group by c.category_id, c.name, c.color
        order by count desc, c.sort_order asc;
    `;

    return rows;
};

export async function getWeekEmotionSummaryDetail ( id: number ): Promise<WeekEmotionSummaryDetail[]> {
    const rows = await sql<WeekEmotionSummaryDetail[]>`
        select 
            emotion, 
            count(*)::int as count
        from posts
        where user_id = ${id}
            and date(created_at at time zone 'Asia/Seoul')
                between date(now() at time zone 'Asia/Seoul') - 6
                and date(now() at time zone 'Asia/Seoul')
        group by emotion
        order by count desc;
    `;

    return rows;
};

export async function getWeekSatisfactionSummaryDetail ( id: number ): Promise<WeekSatifactionSummaryDetail[]> {
    const rows = await sql<WeekSatifactionSummaryDetail[]>`
        select 
            satisfaction,
            count(*)::int as count
        from posts
        where user_id = ${id}
            and date(created_at at time zone 'Asia/Seoul')
                between date(now() at time zone 'Asia/Seoul') - 6
                and date(now() at time zone 'Asia/Seoul')
        group by satisfaction
        order by satisfaction asc;
    `;

    return rows;
};

