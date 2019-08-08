export class Parcela {
    constructor(
        public no_parcela:number,
        public id_tipo:number, 
        public desc_par:string, 
        public norte:string, 
        public sur:string, 
        public este:string, 
        public oeste:string, 
        public noreste:string,
        public noroeste:string,
        public sureste:string,
        public suroeste:string,
        public fecha_alta:string,
        public id_municipio:number,
        public id_proveedor:number,
        public medidas:number,
        public user_id:number,
        public valor_compra:number,
        public forma:number
    ){}
}