package repository

import (
	"database/sql"
	"fmt"
	"strings"

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

func (r *UserRepository) GetUserByID(id int) (*models.User, error) {
	user := &models.User{}
	query := `
	SELECT id, name, email, password_hash, created_at FROM users where id = $1
	`

	err := r.DB.QueryRow(query, id).Scan(
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

func (r *UserRepository) UpdateUser(user *models.User) error {
	setClauses := []string{}
	args := []interface{}{}
	argID := 1

	if user.Name != "" {
		setClauses = append(setClauses, fmt.Sprintf("name = $%d", argID))
		args = append(args, user.Name)
		argID++
	}

	if user.Email != "" {
		setClauses = append(setClauses, fmt.Sprintf("email = $%d", argID))
		args = append(args, user.Email)
		argID++
	}

	if user.PasswordHash != "" {
		setClauses = append(setClauses, fmt.Sprintf("password_hash = $%d", argID))
		args = append(args, user.PasswordHash)
		argID++
	}

	if len(setClauses) == 0 {
		return nil
	}

	query := fmt.Sprintf(`UPDATE users SET %s WHERE id = $%d`,
		strings.Join(setClauses, ", "), argID)

	args = append(args, user.ID)

	_, err := r.DB.Exec(query, args...)
	return err
}

func (r *UserRepository) DeleteUser(userID int) error {
	query := `
	DELETE FROM users WHERE id = $1
	`

	_, err := r.DB.Exec(query, userID)
	return err
}