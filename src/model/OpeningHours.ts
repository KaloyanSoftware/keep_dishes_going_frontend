export type OpeningHours = {
    weeklySchedule: Record<DayOfWeek, DaySchedule>;
};

export type DayOfWeek =
    | "MONDAY"
    | "TUESDAY"
    | "WEDNESDAY"
    | "THURSDAY"
    | "FRIDAY"
    | "SATURDAY"
    | "SUNDAY";

export type DaySchedule = {
    start: string; // formatted as "HH:mm:ss" (from Java's LocalTime)
    end: string;   // formatted as "HH:mm:ss"
};
