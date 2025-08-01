package routes

import (
	"net/http"

	"github.com/abh1SHAKE/go-git-it/backend/internal/controllers"
	"github.com/abh1SHAKE/go-git-it/backend/internal/db"
	"github.com/abh1SHAKE/go-git-it/backend/internal/middleware"
	"github.com/abh1SHAKE/go-git-it/backend/internal/repository"
	"github.com/go-chi/chi/v5"
)

func SnippetRoutes() http.Handler {
	r := chi.NewRouter()

	conn := db.GetDB()
	snippetRepo := repository.NewSnippetRepository(conn)
	snippetController := controllers.NewSnippetController(snippetRepo)

	r.Get("/", snippetController.GetAllPublicSnippets)
	r.Get("/{id}", snippetController.GetSnippetByID)

	r.Group(func(protected chi.Router) {
		protected.Use(middleware.AuthMiddleware)

		protected.Post("/", snippetController.CreateSnippet)
		protected.Get("/my-snippets", snippetController.GetMySnippets)
		protected.Put("/{id}", snippetController.UpdateSnippet)
		protected.Delete("/{id}", snippetController.DeleteSnippet)
	})

	return r
}