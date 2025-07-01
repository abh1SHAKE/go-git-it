package repository

import (
	"database/sql"
	"github.com/abh1SHAKE/go-git-it/backend/internal/models"
)

type UserRepository struct {
	DB *sql.DB
}

func NewUserRepository(db *sql.DB) *UserRepository {
	return &UserRepository{DB: db}
}

func (r *UserRepository) CreateUser(user *models.User) error {
	query := `
	INSERT INTO users (name, email, password_hash)
	VALUES ($1, $2, $3)
	RETURNING id, created_at
	`

	err := r.DB.QueryRow(query, user.Name, user.Email, user.PasswordHash).
		Scan(&user.ID, &user.CreatedAt)
	return err
}

func (r *UserRepository) GetUserByEmail(email string) (*models.User, error) {
	user := &models.User{}
	query := `
	SELECT id, name, email, password_hash, created_at FROM users WHERE email = $1
	`

	err := r.DB.QueryRow(query, email).Scan(
		&user.ID, &user.Name, &user.Email, &user.PasswordHash, &user.CreatedAt,
	)

	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}

	return user, nil
}