.PHONY: clear hermione

clear:
	rm -rf hermione-html-report/

clear-all: clear
	rm -rf hermione/

selenium:
	selenium-standalone start

hermione:
	./node_modules/.bin/hermione gui --retry=2