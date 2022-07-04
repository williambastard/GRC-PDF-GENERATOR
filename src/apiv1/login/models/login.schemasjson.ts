import { Validator } from 'jsonschema';
const validator = new Validator();
const pdf_1300_sd_1527 = {
    "id": "/1300-sd_1527",
    "type": "object",
    "properties": {
        nom: { "type": "string" },
        prenom: { "type": "string" },
        adresse: { "type": "string" },
        cp: { "type": "string" },
        ville: { "type": "string" },
        date: { "type": "string" },
        maison_local: { "type": "boolean" },
        immeuble_local: { "type": "boolean" },
        appartement_local: { "type": "boolean" },
        autre_local: { "type": "boolean" },
        autre_local_precision: { "type": "string" },
        local_habitation: { "type": "boolean" },
        local_50p_habitation: { "type": "boolean" },
        local_xp_habitation: { "type": "boolean" },
        local_xp_chiffre: { "type": "string" },
        local_non_habita: { "type": "boolean" },
        case_proprio: { "type": "boolean" },
        case_locataire: { "type": "boolean" },
        case_autre: { "type": "boolean" },
        autre_type: { "type": "string" }
    },
    "required": ["nom", "prenom", "adresse", "cp", "ville", "date"]
};
validator.addSchema(pdf_1300_sd_1527, '/1300-sd_1527');
export { validator, pdf_1300_sd_1527 }