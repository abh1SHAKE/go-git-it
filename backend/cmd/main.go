package main

import (
	"log"
	"net/http"
	"os"

	"github.com/abh1SHAKE/go-git-it/backend/internal/db"
	"github.com/abh1SHAKE/go-git-it/backend/internal/middleware"
	"github.com/abh1SHAKE/go-git-it/backend/internal/routes"
	"github.com/go-chi/chi/v5"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load("../.env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	db.Init()

	r := chi.NewRouter()

	r.Route("/api", func(r chi.Router) {
		r.Mount("/auth", routes.AuthRoutes())
		r.Mount("/user", middleware.AuthMiddleware(routes.UserRoutes()))
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}
	log.Println("Server running on port", port)
	http.ListenAndServe(":"+port, r)
}