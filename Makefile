NAME=`jq -r '.name' package.json`
VERSION=`jq -r '.version' package.json`

build: clean
	npm install
	coffee -o atlassian-confluence node_modules/atlassian-confluence/src/Confluence.coffee
	coffee -o atlassian-confluence/lib node_modules/atlassian-confluence/src/lib/*
	./node_modules/pkg/lib-es5/bin.js --options max-old-space-size=2048 -t node6-linux -d ./bin/confluence.js -o ./build/${NAME}-${VERSION}-linux
	./node_modules/pkg/lib-es5/bin.js --options max-old-space-size=2048 -t node6-macos-x64 -d ./bin/confluence.js -o ./build/${NAME}-${VERSION}-macos
	./node_modules/pkg/lib-es5/bin.js --options max-old-space-size=2048 -t node6-win-x64 -d ./bin/confluence.js -o ./build/${NAME}-${VERSION}-win.exe

clean:
	rm -rf build
	rm -rf node_modules
