class CinemaModel {
    constructor() {
        this.cinemas = [
            { id: 1, name: "CGV Vincom", address: "Hà Nội" },
            { id: 2, name: "Lotte Cinema", address: "TP.HCM" }
        ];
    }
    
    getAll() {
        return this.cinemas;
    }
    
    getById(id) {
        return this.cinemas.find(c => String(c.id) === String(id));
    }
}
module.exports = new CinemaModel();
