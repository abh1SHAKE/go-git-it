package routes

import (
	"net/http"

	"github.com/abh1SHAKE/go-git-it/backend/internal/controllers"
	"github.com/abh1SHAKE/go-git-it/backend/internal/db"
	"github.com/abh1SHAKE/go-git-it/backend/internal/repository"
	"github.com/go-chi/chi/v5"
)

func AuthRoutes() http.Handler {
	r := chi.NewRouter()

	conn := db.GetDB()
	userRepo := repository.NewUserRepository(conn)
	userController := controllers.NewUserController(userRepo)

	r.Post("/login", userController.Login)
	r.Post("/register", userController.Register)

	return r
}