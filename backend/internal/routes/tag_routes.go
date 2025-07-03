package routes

import (
	"net/http"

	"github.com/abh1SHAKE/go-git-it/backend/internal/controllers"
	"github.com/abh1SHAKE/go-git-it/backend/internal/db"
	"github.com/abh1SHAKE/go-git-it/backend/internal/repository"
	"github.com/go-chi/chi/v5"
)

func TagRoutes() http.Handler {
	r := chi.NewRouter()

	conn := db.GetDB()
	tagRepo := repository.NewTagRepository(conn)
	tagController := controllers.NewTagController(tagRepo)

	r.Get("/", tagController.GetAllTags)

	return r
}