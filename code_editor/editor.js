'use latest';

import express from 'express';
import { fromExpress } from 'webtask-tools';
import bodyParser from 'body-parser';
const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  const HTML = renderView({
    title: 'My Python Playground',
  });

  res.set('Content-Type', 'text/html');
  res.status(200).send(HTML);
});

module.exports = fromExpress(app);

function renderView(locals) {
  return `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <title>${locals.title}</title>
        </head>
    
        <body>
            <div>
                <form id="form">
                    <h3> Choose language: </h3>
                    <select id="mode" size="1">
                        <option value="ace/mode/python">python</option>
                        <option value="ace/mode/c_cpp">c++</option>
                        <option value="ace/mode/perl">perl</option>
                    </select>
                    <br/>
                    <br/>
                    <div id="editor" style="height:200px;margin:0 auto">print 'Hello from Python'</div>
                    <button type="submit">Run</button>
                </form>
    
                <div>
                    <h3> Output: </h3>
                    <pre id="output"></pre>
                    <h3> Error: </h3>
                    <pre id="error"></pre>
                </div>
            </div>
    
            <script src="//cdnjs.cloudflare.com/ajax/libs/ace/1.2.5/ace.js"></script>
            <script src="//ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
            <script type="text/javascript">
                var editor = ace.edit('editor');
                editor.setTheme("ace/theme/monokai");
                editor.session.setMode("ace/mode/python");
                
                $('#mode').on('change', event => {
                  var mode = $('option:selected').attr('value');
                  console.log(mode);
                  editor.getSession().setMode(mode);
                });
                
                $('#form').submit(event => {
                    let data = new FormData();
    
                    data.append('lang', $('option:selected').attr('value'));
                    data.append('code', editor.getValue());
    
                    $.ajax({
                        type: 'POST',
                        url: 'https://wt-3a215bb076d66362908cc979d40455e7-0.run.webtask.io/exec',
                        data: data,
                        processData: false,
                        contentType: false,
                        dataType: 'json',
                        encode: true
                    })
                    .done(data => {
                        $('#output').text(data.stdout);
                        $('#error').text(data.stderr);
                    });
                    event.preventDefault();
                });
            </script>
        </body>
    </html>
  `;
}
