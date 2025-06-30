package models

import "time"

type Snippet struct {
	ID        int    `json:"id"`
	UserID    int    `json:"user_id"`
	Title     string `json:"title"`
	Code      string `json:"code"`
	Language  string `json:"language"`
	Public    bool   `json:"public"`
	CreatedAt time.Time `json:"created_at"`
}

type SnippetWithTags struct {
	Snippet
	Tags []Tag `json:"tags"`
}