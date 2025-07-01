package utils

import (
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

func getEnv(key, fallback string) string {
	env := os.Getenv(key)
	if env == "" {
		return fallback
	}

	return env
}

func GenerateJWT(userID int) (string, error) {
	claims := jwt.MapClaims{
		"user_id": userID,
		"exp": time.Now().Add(time.Hour * 24).Unix(),
	}

	jwtSecret := []byte(getEnv("JWT_SECRET", "fallbacksecretkey"))

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtSecret)
}