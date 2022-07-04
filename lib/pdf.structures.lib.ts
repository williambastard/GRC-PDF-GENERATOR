
import path from 'path';
import text2png from 'text2png';
export const pdfObjectData = {
    "id": "2454444",
    "apiURL": "https://api.crm.etienne-services.fr/",
    "document_id": "96173c8eaa67354d112ea876cc90e4855fcd2e2d",
    "type_document": "devis",
    "noms_inter":"Nom(s)",
    "prenoms_inter":"Prénom(s)",
    "adresse_inter":"123 rue de la marmotte",
    "adresse_complement1_inter":"",
    "adresse_complement2_inter":"",
    "adresse_complement3_inter":"",
    "digicode_inter":"",
    "ville_inter": "Paris",
    "codepostal_inter":"75000",
    "noms_devis":"Nom(s)",
    "prenoms_devis":"Prénom(s)",
    "adresse_devis":"123 rue de la marmotte",
    "adresse_complement1_devis":"",
    "adresse_complement2_devis":"",
    "adresse_complement3_devis":"",
    "ville_devis": "Paris",
    "codepostal_devis":"75000",
    "date": new Date(),
    "date_devis": new Date(),
    "date_inter": new Date(),
    "urgence": "urgente",
    "statusFacture": "ACQUITÉE",
    "status": "VALIDÉ",
    "modalites": "vir",
    "QR": "",
    "signature": text2png("Signature", {
        color: 'black',
        font: "72pt Cherolina",
        localFontPath: path.join(process.cwd(), `public/views/fonts/cherolina/Cherolina.ttf`),
        localFontName: 'Cherolina',
        padding: 5,
        output: "dataURL"
    }),
    "produits": [{
        "produitimage": "data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYV2MQdZ74HwADQwHpjwPqXAAAAABJRU5ErkJggg==",
        "description": "Ceci est une description de produit plus ou moins longue selon les informations contenues ddans la descrption du produit en lui-même",
        "quantite": "1",
        "reduction": "0.00",
        "prixTVA": "0.10",
        "prixHT": "45.00",
    }], 
    "paiements": [{
        "type": "esp",
        "montant": "283.18",
        "date": "2002-01-31 15:20:17",
        "pm_id": "4116a756a753236_45c6130fd9900a4c2b4f6ad68fa73b09d23d0240",
        "details_last4": "0000",
        "details_type": "paiement esp",
        "evidence": {}
    },
    {
        "type": "cb",
        "montant": "795.46",
        "date": "2002-01-15 16:00:36",
        "pm_id": "pi_3KTSW8EXHzWlh3Nl1Dp5dm6C",
        "details_last4": "3220",
        "details_type": "Paiement \u00e0 distance par carte visa"
    }
    ],
    "rapports": [
        {
            "after": {
                "37fd3ae688612fb24b96d456fcff2dbb0a18823f621885fdc6914316b9cd1df2": {
                    "0": {
                        "time": 1642096613,
                        "url": "https:\/\/api.crm.etienne-services.fr\/upload\/37fd3ae688612fb24b96d456fcff2dbb0a18823f621885fdc6914316b9cd1df2\/96173c8eaa67354d112ea876cc90e4855fcd2e2d\/after\/bd73753ca632.jfif",
                        "type": "image\/jpeg"
                    }
                }
            },
            "textarea": {
                "37fd3ae688612fb24b96d456fcff2dbb0a18823f621885fdc6914316b9cd1df2":
                {
                    "pseudo": "Julien",
                    "commentaire": "test", "date": 1642096606
                }
            },
            "before": {
                "37fd3ae688612fb24b96d456fcff2dbb0a18823f621885fdc6914316b9cd1df2": {
                    "0": {
                        "time": 1642096611,
                        "url": "http:\/\/api.crm.etienne-services.fr\/\/upload\/37fd3ae688612fb24b96d456fcff2dbb0a18823f621885fdc6914316b9cd1df2\/96173c8eaa67354d112ea876cc90e4855fcd2e2d\/before\/bd73753ca632.jfif",
                        "type": "image\/jpeg"
                    }
                }
            }
        }
    ],
}
export const pdfDataStructure = [{
    noms: "TEST",
    prenoms: "TEST",
    adresse: "2 rue diderot",
    cp: "93000",
    ville: "Bobigny",
    date: new Date().toLocaleDateString('fr-FR'),
    maison_local: true,
    immeuble_local: false,
    appartement_local: false,
    autre_local: false,
    autre_local_precision: "    ",
    local_habitation: true,
    local_50p_habitation: false,
    local_xp_habitation: false,
    local_xp_chiffre: " ",
    local_non_habita: false,
    case_proprio: false,
    case_locataire: true,
    case_autre: false,
    autre_type: "   ",
    case_fondation: true,
    etat_neuf: false,
    affet_ele: false,
    etat_neuf2: false,
    facade: false,
    etat_neuf3: false,
    nonneuf: false,
    non_plancher: false,
    neuf_2sur3_plancher: false,
    neuf_2sur3Plus_plancher: false,
    nonhuisseries_ext: false,
    neuf_2sur3_huisseries_ext: false,
    neuf_2sur3Plus_huisseries: false,
    noncloisons: false,
    neuf_2sur3_cloisons: false,
    neuf_2sur3Plus_cloisons: false,
    nonplomberie: false,
    neuf_2sur3_plomberie: false,
    neuf_2sur3Plus_plomberie: false,
    nonelec: false,
    neuf_2sur3_elec: false,
    neuf_2sur3Plus_elec: false,
    nonchauffage: false,
    neuf_2sur3_chauffage: false,
    neuf_2sur3Plus_chauffage: false,
    attest_period2ans: true,
    attest_travsurelev: true,
    attest_travqualiteener: false,
    attest_tvareduite: false,
    signature_af_image: text2png("Signature", {
        color: 'black',
        font: "72pt Cherolina",
        localFontPath: path.join(process.cwd(), `public/views/fonts/cherolina/Cherolina.ttf`),
        localFontName: 'Cherolina',
        padding: 5,
        output: "dataURL"
    }),
    interno: ""
}]

export let signature = text2png("Signature", {
    color: 'black',
    font: "72pt Cherolina",
    localFontPath: path.join(process.cwd(), `public/views/fonts/cherolina/Cherolina.ttf`),
    localFontName: 'Cherolina',
    padding: 5,
    output: "dataURL"
})