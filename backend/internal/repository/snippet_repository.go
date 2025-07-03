package repository

import (
	"database/sql"
	"fmt"
	"strings"
	"time"

	"github.com/abh1SHAKE/go-git-it/backend/internal/models"
)

type SnippetRepository struct {
	DB *sql.DB
}

func NewSnippetRepository(db *sql.DB) *SnippetRepository {
	return &SnippetRepository{DB: db}
}

func (r *SnippetRepository) CreateSnippet(snippet *models.Snippet, tagNames []string) error {
	transcation, err := r.DB.Begin()
	if err != nil {
		return err
	}
	defer transcation.Rollback()

	query := `
		INSERT INTO snippets (user_id, title, code, language, public, created_at)
		VALUES ($1, $2, $3, $4, $5, $6)
		RETURNING id, created_at
	`

	err = transcation.QueryRow(
		query,
		snippet.UserID,
		snippet.Title,
		snippet.Code,
		snippet.Language,
		snippet.Public,
		time.Now(),
	).Scan(&snippet.ID, &snippet.CreatedAt)

	if err != nil {
		return fmt.Errorf("failed to insert snippet: %w", err)
	}

	for _, tagName := range tagNames {
		tagName = strings.ToLower(strings.TrimSpace(tagName))

		var tagID int
		err := transcation.QueryRow(`
			INSERT INTO tags (name)
			VALUES ($1)
			ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
			RETURNING id
		`, tagName).Scan(&tagID)

		if err != nil {
			return fmt.Errorf("failed to insert tag '%s': %w", tagName, err)
		}

		_, err = transcation.Exec(`
			INSERT INTO snippet_tags (snippet_id, tag_id)
			VALUES ($1, $2)
		`, snippet.ID, tagID)

		if err != nil {
			return fmt.Errorf("failed to insert snippet_tag: %w", err)
		}
	}

	return transcation.Commit()
}

func (r *SnippetRepository) GetAllPublicSnippets() ([]models.SnippetWithTags, error) {
	query := `
		SELECT s.id, s.user_id, s.title, s.code, s.language, s.public, s.created_at, u.name
		FROM snippets s
		JOIN users u ON s.user_id = u.id
		WHERE s.public = TRUE
		ORDER BY s.created_at DESC
	`

	rows, err := r.DB.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var snippets []models.SnippetWithTags

	for rows.Next() {
		var s models.Snippet
		var authorName string

		err := rows.Scan(&s.ID, &s.UserID, &s.Title, &s.Code, &s.Language, &s.Public, &s.CreatedAt, &authorName)
		if err != nil {
			return nil, err
		}

		tags, err := r.GetTagsForSnippet(s.ID)
		if err != nil {
			return nil, err
		}

		snippets = append(snippets, models.SnippetWithTags{
			Snippet: s,
			Tags: tags,
		})
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return snippets, nil
}

func (r *SnippetRepository) GetTagsForSnippet(snippetID int) ([]models.Tag, error) {
	query := `
		SELECT t.id, t.name
		FROM tags t
		JOIN snippet_tags st ON t.id = st.tag_id
		WHERE st.snippet_id = $1
	`

	rows, err := r.DB.Query(query, snippetID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var tags []models.Tag
	for rows.Next() {
		var tag models.Tag
		if err := rows.Scan(&tag.ID, &tag.Name); err != nil {
			return nil, err
		}

		tags = append(tags, tag)
	}

	return tags, nil
}

func (r *SnippetRepository) GetSnippetsByUserID(userID int) ([]models.SnippetWithTags, error) {
	query := `
		SELECT s.id, s.user_id, s.title, s.code, s.language, s.public, s.created_at, t.id, t.name
		FROM snippets s
		LEFT JOIN snippet_tags st ON s.id = st.snippet_id
		LEFT JOIN tags t ON st.tag_id = t.id
		WHERE s.user_id = $1
		ORDER BY s.created_at DESC
	`

	rows, err := r.DB.Query(query, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	snippetMap := make(map[int]*models.SnippetWithTags) 

	for rows.Next() {
		var s models.Snippet
		var tagID sql.NullInt64
		var tagName sql.NullString

		err := rows.Scan(
			&s.ID, &s.UserID, &s.Title, &s.Code, &s.Language, &s.Public, &s.CreatedAt,
			&tagID, &tagName,
		)
		
		if err != nil {
			return nil, err
		}

		if _, exists := snippetMap[s.ID]; !exists {
			snippetMap[s.ID] = &models.SnippetWithTags{
				Snippet: s,
				Tags: []models.Tag{},
			}
		}

		if tagID.Valid && tagName.Valid {
			snippetMap[s.ID].Tags = append(snippetMap[s.ID].Tags, models.Tag{
				ID: int(tagID.Int64),
				Name: tagName.String,
			})
		}
	}

	snippets := make([]models.SnippetWithTags, 0, len(snippetMap))
	for _, snip := range snippetMap {
		snippets = append(snippets, *snip)
	}

	return snippets, nil
}

func (r *SnippetRepository) GetSnippetByID(id int) (*models.SnippetWithTags, error) {
	query := `
		SELECT id, user_id, title, code, language, public, created_at
		FROM snippets
		WHERE id = $1
	`

	var s models.SnippetWithTags
	err := r.DB.QueryRow(query, id).Scan(
		&s.ID, &s.UserID, &s.Title, &s.Code, &s.Language, &s.Public, &s.CreatedAt,
	)

	if err != nil {
		return nil, err
	}

	tagsQuery := `
		SELECT t.id, t.name FROM tags t
		JOIN snippet_tags st ON st.tag_id = t.id
		WHERE st.snippet_id = $1
	`

	rows, err := r.DB.Query(tagsQuery, id)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var tag models.Tag
		if err := rows.Scan(&tag.ID, &tag.Name); err != nil {
			return nil, err
		}
		s.Tags = append(s.Tags, tag)
	}

	return &s, nil
}

func (r *SnippetRepository) UpdateSnippet(snippet *models.Snippet, tagNames []string) error {
	transaction, err := r.DB.Begin()
	if err != nil {
		return err
	}
	defer transaction.Rollback()

	query := `
		UPDATE snippets
		SET title = $1, code = $2, language = $3, public = $4
		WHERE id = $5 AND user_id = $6
	`

	_, err = transaction.Exec(query,
		snippet.Title,
		snippet.Code,
		snippet.Language,
		snippet.Public,
		snippet.ID,
		snippet.UserID,
	)

	if err != nil {
		return err
	}

	_, err = transaction.Exec("DELETE FROM snippet_tags WHERE snippet_id = $1", snippet.ID)
	if err != nil {
		return err
	}

	for _, tagName := range tagNames {
		var tagID int
		err = transaction.QueryRow("INSERT INTO tags (name) VALUES ($1) ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name RETURNING id", tagName).
			Scan(&tagID)
		
		if err != nil {
			return err
		}

		_, err = transaction.Exec("INSERT INTO snippet_tags (snippet_id, tag_id) VALUES ($1, $2)", snippet.ID, tagID)
		if err != nil {
			return err
		}
	}

	return transaction.Commit()
}

func (r *SnippetRepository) DeleteSnippet(id int, userID int) error {
	query := `DELETE FROM snippets WHERE id = $1 AND user_id = $2`
	result, err := r.DB.Exec(query, id, userID)
	if err != nil {
		return err
	}

	rowsAffected, _ := result.RowsAffected()
	if rowsAffected == 0 {
		return sql.ErrNoRows
	}

	return nil
}

func (r *SnippetRepository) GetPublicSnippetsByTag(tagName string) ([]models.SnippetWithTags, error) {
	query := `
		SELECT s.id, s.user_id, s.title, s.code, s.language, s.public, s.created_at, u.name
		FROM snippets s
		JOIN users u ON s.user_id = u.id
		JOIN snippet_tags st ON s.id = st.snippet_id
		JOIN tags t ON st.tag_id = t.id
		WHERE s.public = TRUE AND t.name = $1
		ORDER BY s.created_at DESC
	`

	rows, err := r.DB.Query(query, tagName)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var snippets []models.SnippetWithTags
	for rows.Next() {
		var s models.Snippet
		var authorName string 

		err := rows.Scan(&s.ID, &s.UserID, &s.Title, &s.Code, &s.Language, &s.Public, &s.CreatedAt, &authorName)
		if err != nil {
			return nil, err
		}

		tags, err := r.GetTagsForSnippet(s.ID)
		if err != nil {
			return nil, err 
		}

		snippets = append(snippets, models.SnippetWithTags{
			Snippet: s,
			Tags: tags,
		})
	}

	return snippets, nil
}