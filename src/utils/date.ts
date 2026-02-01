import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import utc from 'dayjs/plugin/utc'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

/* =========================
 * Plugins
 * ========================= */
dayjs.extend(customParseFormat)
dayjs.extend(utc)
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

/* =========================
 * 保存用（データ境界）
 * ========================= */

/**
 * Date → YYYY-MM-DD
 * DB: DATE 型用（時間は意図的に捨てる）
 */
export function toYMD(date: Date | null): string | null {
    if (!date) return null
    return dayjs(date).format('YYYY-MM-DD')
}

/**
 * Date → ローカルISO文字列
 * 例: 2026-02-01T10:30:00+09:00
 * DB: TIMESTAMPTZ / DATETIME
 */
export function toLocalISO(date: Date | null): string | null {
    if (!date) return null
    return dayjs(date).format('YYYY-MM-DDTHH:mm:ssZ')
}

/**
 * Date → UTC ISO文字列
 * 例: 2026-02-01T01:30:00Z
 * DB: TIMESTAMPTZ（UTC保存）
 */
export function toUTCISO(date: Date | null): string | null {
    if (!date) return null
    return dayjs(date).utc().format('YYYY-MM-DDTHH:mm:ss[Z]')
}

/* =========================
 * 取得用（API → UI）
 * ========================= */

/**
 * YYYY-MM-DD / ISO → Date
 * Safari / strict 安全
 */
export function parseDate(value: string | null): Date | null {
    if (!value) return null

    // DATE 型
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        const d = dayjs(value, 'YYYY-MM-DD', true)
        return d.isValid() ? d.toDate() : null
    }

    // ISO / その他
    const d = dayjs(value)
    return d.isValid() ? d.toDate() : null
}

/* =========================
 * 表示用（UI）
 * ========================= */

/**
 * Date / string → 表示用フォーマット
 */
export function formatDate(
    date: Date | string | null,
    format = 'YYYY/MM/DD'
): string {
    if (!date) return ''
    return dayjs(date).format(format)
}

/**
 * タイムスタンプを相対時間（◯分前）または絶対日付で表示する
 * @param timestamp ISO文字列
 * @param thresholdDays 相対表示を維持する日数
 */
export function formatTimestamp(
    timestamp: string | null,
    thresholdDays = 7
): string {
    if (!timestamp) return ''

    const date = dayjs(timestamp)
    if (!date.isValid()) return ''

    const now = dayjs()
    const diffMinutes = now.diff(date, 'minute')
    const diffDays = now.diff(date, 'day')

    if (diffMinutes < 1) return '今'
    if (diffMinutes < 60) return `${diffMinutes}分前`
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}時間前`
    if (diffDays < thresholdDays) return `${diffDays}日前`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}週間前`

    return date.format('YYYY/MM/DD')
}

/* =========================
 * 判定・比較（業務ロジック）
 * ========================= */

export function isToday(date: Date | string): boolean {
    return dayjs(date).isSame(dayjs(), 'day')
}

export function isOverdue(date: Date | string): boolean {
    return dayjs(date).isBefore(dayjs(), 'day')
}

export function compareDate(
    a: Date | string,
    b: Date | string
): number {
    return dayjs(a).valueOf() - dayjs(b).valueOf()
}

export function isBetweenDays(
    target: Date | string,
    start: Date | string,
    end: Date | string
): boolean {
    const t = dayjs(target)
    return t.isSameOrAfter(start, 'day') &&
        t.isSameOrBefore(end, 'day')
}
