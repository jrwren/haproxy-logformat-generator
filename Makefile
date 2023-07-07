build: docs/index.html docs/index.js

docs/index.js: index.js
	cp index.js docs/index.js

docs/index.html:
	cp index.html docs/index.html

index.js: index.ts
	tsc -t es2022 index.ts

clean:
	rm index.js docs/index.js docs/index.html
