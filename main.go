package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"regexp"
	"strings"
)

func main() {
	http.HandleFunc("/", handler)
	http.HandleFunc("/scripts/", scriptsHandler)
	http.HandleFunc("/styles/", stylesHandler)

	http.ListenAndServe(":8080", nil)
}

func handler(w http.ResponseWriter, r *http.Request) {
	contents, error := ioutil.ReadFile("views/index.html")

	if error != nil {
		log.Fatal(error)
	}

	formattedContents := template(string(contents))

	fmt.Fprintf(w, formattedContents)
}

func template(contents string) string {

	formattedContents := contents
	regex, error := regexp.Compile("{{bundle:[a-zA-Z0-9-/]*}}")

	if error != nil {
		log.Fatal(error)
	}

	matches := regex.FindAllString(contents, -1)

	if matches != nil {
		for _, match := range matches {
			bundleName := strings.Replace(strings.Replace(match, "{{bundle:", "", 1), "}}", "", 1)

			bundleContents, error := ioutil.ReadFile(bundleName)

			if error != nil {
				log.Fatal(error)
			}

			formattedContents = strings.Replace(formattedContents, match, string(bundleContents), 1)
		}
	}

	return formattedContents
}

func scriptsHandler(w http.ResponseWriter, r *http.Request) {
	contents := loadContent(r.RequestURI)

	w.Header().Set("Content-Type", "text/javascript")

	w.Write(contents)
}

func stylesHandler(w http.ResponseWriter, r *http.Request) {
	contents := loadContent(r.RequestURI)

	w.Header().Set("Content-Type", "text/css")

	w.Write(contents)
}

func loadContent(path string) []byte {
	contents, error := ioutil.ReadFile("." + path)

	if error != nil {
		log.Fatal(error)
	}

	return contents
}
