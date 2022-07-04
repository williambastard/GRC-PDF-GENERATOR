module.exports = (TwingTemplate) => {
    return new Map([
        [0, class extends TwingTemplate {
            constructor(environment) {
                super(environment);

                this._source = new this.Source(`{% block footercontent %}
<footer class="column__invoice m10p">
  <hr />
  <div class="row__invoice row__invoice-reverse preview mentions space-between border">
    <div class="details">
      <div class="mentions column__invoice">
        <p>
            <b>Après acceptation du devis les mentions suivantes seront ajoutés</b><br />
          {% if (doc.urgence == "urgente") %} 
          J'atteste sur l'honneur vouloir l'exécution immédiate des travaux, renoncant ainsi à mon droit de
          rétractation.
          <br />
          {% endif %}
          <b>Devis reçu avant l'exécution des travaux<br />BON POUR ACCORD</b>
          <br />
          <br />
        </p>
      </div>
      <div class="signature column__invoice alignitems-content-center">
        <span>
          <b>Fait à {{ doc.ville_inter | default("") }}, le {{ doc.date | date('d/m/Y à H:i:s') }}</b><br />
          <b class="hidden" >Signature du client</b>
        </span>
        <img class="hidden" src="{{doc.signature}}" />
      </div>
    </div>
    <div class="authentification qrcode hidden">
      <span>Code de vérification d'authenticité</span>
      <img src="{{doc.QR}}" />
    </div>
  </div>
  <div class="legislation">
    <span>
      Etienne Services - SASU au capital de 500 euros<br />
      N° Siret : 85154819800023 - R.C.S. BOBIGNY B 851 548 198 - Code APE : 9529Z<br />
      Assurance Décénnale: ERGO VERSICHERUNG AG - POLICE N° SV75018041T07617<br />
    </span>
    <span>
      Ce devis a été signé électroniquement conformément aux articles de la loi n°2000-230 du 13 mars 2000 et de l'article 1366 du Code civil. Ces
      lois disposent ainsi que la signature électronique a la même force et valeur juridique qu'une signature manuscrite
    </span>
  </div>
</footer>
{% endblock %}
`, `S:\\CRM-API\\public\\views\\layouts\\pdf\\invoice-main\\preview\\footer.html`);

                let aliases = new this.Context();
                
                this.blockHandlers = new Map([
                    ['footercontent', async (context, outputBuffer, blocks = new Map()) => {
                        let aliases = this.aliases.clone();
                        outputBuffer.echo(`<footer class="column__invoice m10p">
  <hr />
  <div class="row__invoice row__invoice-reverse preview mentions space-between border">
    <div class="details">
      <div class="mentions column__invoice">
        <p>
            <b>Après acceptation du devis les mentions suivantes seront ajoutés</b><br />
          `);
                        if (this.evaluate(this.compare(await this.traceableMethod(this.getAttribute, 9, this.source)(this.environment, (context.has(`doc`) ? context.get(`doc`) : null), `urgence`, new Map([]), `any`, false, false, false), `urgente`))) {
                            outputBuffer.echo(` 
          J'atteste sur l'honneur vouloir l'exécution immédiate des travaux, renoncant ainsi à mon droit de
          rétractation.
          <br />
          `);
                        }
                        outputBuffer.echo(`          <b>Devis reçu avant l'exécution des travaux<br />BON POUR ACCORD</b>
          <br />
          <br />
        </p>
      </div>
      <div class="signature column__invoice alignitems-content-center">
        <span>
          <b>Fait à `);
                        outputBuffer.echo(((await this.traceableMethod(this.getAttribute, 21, this.source)(this.environment, (context.has(`doc`) ? context.get(`doc`) : null), `ville_inter`, new Map([]), `any`, true, true, false)) ? (await this.environment.getFilter('default').traceableCallable(21, this.source)(...[await this.traceableMethod(this.getAttribute, 21, this.source)(this.environment, (context.has(`doc`) ? context.get(`doc`) : null), `ville_inter`, new Map([]), `any`, false, false, false), ``])) : (``)));
                        outputBuffer.echo(`, le `);
                        outputBuffer.echo(await this.environment.getFilter('date').traceableCallable(21, this.source)(...[this, await this.traceableMethod(this.getAttribute, 21, this.source)(this.environment, (context.has(`doc`) ? context.get(`doc`) : null), `date`, new Map([]), `any`, false, false, false), `d/m/Y à H:i:s`]));
                        outputBuffer.echo(`</b><br />
          <b class="hidden" >Signature du client</b>
        </span>
        <img class="hidden" src="`);
                        outputBuffer.echo(await this.traceableMethod(this.getAttribute, 24, this.source)(this.environment, (context.has(`doc`) ? context.get(`doc`) : null), `signature`, new Map([]), `any`, false, false, false));
                        outputBuffer.echo(`" />
      </div>
    </div>
    <div class="authentification qrcode hidden">
      <span>Code de vérification d'authenticité</span>
      <img src="`);
                        outputBuffer.echo(await this.traceableMethod(this.getAttribute, 29, this.source)(this.environment, (context.has(`doc`) ? context.get(`doc`) : null), `QR`, new Map([]), `any`, false, false, false));
                        outputBuffer.echo(`" />
    </div>
  </div>
  <div class="legislation">
    <span>
      Etienne Services - SASU au capital de 500 euros<br />
      N° Siret : 85154819800023 - R.C.S. BOBIGNY B 851 548 198 - Code APE : 9529Z<br />
      Assurance Décénnale: ERGO VERSICHERUNG AG - POLICE N° SV75018041T07617<br />
    </span>
    <span>
      Ce devis a été signé électroniquement conformément aux articles de la loi n°2000-230 du 13 mars 2000 et de l'article 1366 du Code civil. Ces
      lois disposent ainsi que la signature électronique a la même force et valeur juridique qu'une signature manuscrite
    </span>
  </div>
</footer>
`);
                    }]
                ]);
            }

            async doDisplay(context, outputBuffer, blocks = new Map()) {
                let aliases = this.aliases.clone();

                outputBuffer.echo(await this.traceableRenderBlock(1, this.source)('footercontent', context.clone(), outputBuffer, blocks));
            }

        }],
    ]);
};