module.exports = (TwingTemplate) => {
    return new Map([
        [0, class extends TwingTemplate {
            constructor(environment) {
                super(environment);

                this._source = new this.Source(`<!DOCTYPE HTML>
<html lang="fr">

<head>
\t<title>{{titlePage}} - Etienne Services WebAPI</title>
\t{% block stylesheets %}
\t<link rel="stylesheet" type="text/css" href="{{HOST}}/static/layouts/pdf/assets/pdf.css" />
\t{% endblock %}
</head>

<body>
\t{% block preview %}
\t{% endblock %}

\t{% block report %}
\t{% endblock %}
</body>

</html>`, `S:\\CRM-API\\public\\views\\layouts\\pdf\\invoice-main\\preview\\base.html`);

                let aliases = new this.Context();
                
                this.blockHandlers = new Map([
                    ['stylesheets', async (context, outputBuffer, blocks = new Map()) => {
                        let aliases = this.aliases.clone();
                        outputBuffer.echo(`\t<link rel="stylesheet" type="text/css" href="`);
                        outputBuffer.echo((context.has(`HOST`) ? context.get(`HOST`) : null));
                        outputBuffer.echo(`/static/layouts/pdf/assets/pdf.css" />
\t`);
                    }],
                    ['preview', async (context, outputBuffer, blocks = new Map()) => {
                        let aliases = this.aliases.clone();
                        outputBuffer.echo(`\t`);
                    }],
                    ['report', async (context, outputBuffer, blocks = new Map()) => {
                        let aliases = this.aliases.clone();
                        outputBuffer.echo(`\t`);
                    }]
                ]);
            }

            async doDisplay(context, outputBuffer, blocks = new Map()) {
                let aliases = this.aliases.clone();

                outputBuffer.echo(`<!DOCTYPE HTML>
<html lang="fr">

<head>
\t<title>`);
                outputBuffer.echo((context.has(`titlePage`) ? context.get(`titlePage`) : null));
                outputBuffer.echo(` - Etienne Services WebAPI</title>
\t`);
                outputBuffer.echo(await this.traceableRenderBlock(6, this.source)('stylesheets', context.clone(), outputBuffer, blocks));
                outputBuffer.echo(`</head>

<body>
\t`);
                outputBuffer.echo(await this.traceableRenderBlock(12, this.source)('preview', context.clone(), outputBuffer, blocks));
                outputBuffer.echo(`
\t`);
                outputBuffer.echo(await this.traceableRenderBlock(15, this.source)('report', context.clone(), outputBuffer, blocks));
                outputBuffer.echo(`</body>

</html>`);
            }

            get isTraitable() {
                return false;
            }

        }],
    ]);
};