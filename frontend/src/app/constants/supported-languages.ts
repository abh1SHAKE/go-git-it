export interface LanguageOption {
    label: string;
    value: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
    {label: 'HTML / MARKUP', value: 'html'},
    {label: 'PHP', value: 'php'},
    {label: 'JavaScript', value: 'javascript'},
    {label: 'TypeScript', value: 'typescript'},
    {label: 'Python', value: 'python'},
    {label: 'Java', value: 'java'},
    {label: 'C', value: 'c'},
    {label: 'C++', value: 'cpp'},
    {label: 'Go', value: 'go'},
    {label: 'Ruby', value: 'ruby'},
    {label: 'Swift', value: 'swift'},
    {label: 'Kotlin', value: 'kotlin'},
    {label: 'Rust', value: 'rust'},
    {label: 'SQL', value: 'sql'},
]