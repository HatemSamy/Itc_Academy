

 export const asynchandlier = (fu)=>{
    return(req,res,next)=>{
        fu(req,res,next).catch(err=>{

          //  res.status(500).json({massage:"catch error",errMas:err.message,stack:err.stack})
          next(new Error(err,{cuase:500}))
        })
    }






 }



 export const globalErrorHandling= (err,req,res,next)=>{

    if (err) {
        if (process.env.MOOD==="DEV") {
        res.status(err["cause"]||500).json({messege:"catch error",errMas:err.message,stack:err.stack})
            
        } else {
        res.status(err["cause"]||500).json({messege:"catch error",errMas:err.message})
            
        }
    }
    
    }