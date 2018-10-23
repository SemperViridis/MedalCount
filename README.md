# Medal Count

The [Medal Count Widget] presents Olympic results, sortable by type of medal or total medals by Country. The user can click their desired medal type to view the results sorted accordingly

## Getting started

1. The widget is written in React and can be embedded in any website

2. Babel is used to compile the React code to allow use of JSX and compatibility with older browsers. Babel enters in the client/src folder and produces the script to be utilized by the target website (medal-widget.js in the root directory)

3. To develop locally, Node.js must be installed on the machine. In the project folder in terminal, Run:

npm init -y
npm install babel-cli@6 babel-preset-react-app@3

npx babel --watch src --out-dir . --presets react-app/prod

4. No bundler or server config is required to run the widget, however the target website must load the production React scripts:

<script src="https://unpkg.com/react@16/umd/react.production.min.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js" crossorigin></script>

As an alternative, Webpack could be configured to bundle the widget so as to avoid loading the scripts in this manner

5. The widget accepts two parameters: 1. the Id of the html element the widget will target and 2. the default sort method; it will sort by gold if no method is provided

6. To initialize the widget, you just need to call the widget with the aforementioned arguments Example:

<script type="text/javascript">

    widget("medal-widget", "gold");

</script>

7. The stylesheet (styles/medal-widget.css) also needs to be incorporated into the target website
