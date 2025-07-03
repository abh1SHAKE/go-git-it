package repository

import (
	"database/sql"

	"github.com/abh1SHAKE/go-git-it/backend/internal/models"
)

type TagRepository struct {
	DB *sql.DB
}

func NewTagRepository(db *sql.DB) *TagRepository {
	return &TagRepository{DB: db}
}

func (r *TagRepository) GetAllTags() ([]models.Tag, error) {
	query := `
		SELECT id, name FROM tags ORDER BY name
	`

	rows, err := r.DB.Query(query)
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