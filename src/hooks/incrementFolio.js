export const incrementFolio = (id, isChecked) => {

    if(!isChecked){
        if (!id || id.trim() === "") {
            return {
                target:{
                  name:"folio",
                  value: "R-00001"
                }
              }
        }
        const [prefix, number] = id.split("-");
      
        const incrementedNumber = String(parseInt(number, 10) + 1).padStart(number.length, "0");
        
        return {
            target:{
              name:"folio",
              value: `${prefix}-${incrementedNumber}`
            }
          }
    }else{
        return {
            target:{
              name:"folio",
              value: ""
            }
          }
    }
    
}


