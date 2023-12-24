import { useContext, useEffect, useReducer } from "react";
import { auth } from "../../context/context";
import '../../style/group.css'



function Score(params){
    let pos = 0;
    let token = useContext(auth)
    let grpstates = params.grps.grpstates;
    let setgrpstates = params.grps.setgrpstates;
    let [scorestates,setscore]=useReducer(
        (scorestates,action)=>{
            return({...scorestates,...action})
        },{
            top:[]
        }
    )

    async function getscore(){
        // console.log(grpstates.current_gid);
        let res = await fetch('http://127.0.0.1:80/score/getscore',{
          method:'post',
          headers:{
            "auth-token":token,
            "content-type":"application/json"
          },
          body:JSON.stringify({
            gid:grpstates.current_gid
          })
        })
        let temp =await res.json()
        console.log(temp);
        setscore({top:temp})

    }

    useEffect(
        ()=>{
            getscore()
        },[]
    )

    return(
        <>
        <div className="score">
           <div className="scorehead">
           
           <h2>Score Board</h2>
           </div>
           {
            scorestates.top.map((e)=>{
                pos = pos+1
                return(
                    <>
                    
                    {/* <br />
                    Name:{e.name} <br />
                    position:{pos} <br />
                    ontrack days:{e.ontrack} <br />
                    <br /> */}
                    <div className="scorcard">
                        <h1>{pos}</h1>

                        <h2>{e.name}</h2>
                        <h3>Been on track for {e.ontrack} days</h3>
                    </div>
                    </>
                )
            })
           }
           <button onClick={()=>{setgrpstates({scoreclick:false})}}>Back</button>
        </div>
        </>
    )

}

export default  Score;