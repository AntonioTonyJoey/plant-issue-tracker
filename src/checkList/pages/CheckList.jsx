import { ChecklistLayout } from "../layout/ChecklistLayout"
import { IconButton } from "@mui/material"
import { NothingSelectedView, ChecklistView, Pruebas, BlockStore, FeedBack, SisterPlant } from "../views"
import { AddOutlined } from "@mui/icons-material"
import { ChargePage } from "../../ui/components/ChargePage"
import { useSelector } from "react-redux"

export const CheckList = () => {
  const {navegacion} = useSelector(state => state.nav);
  let vista;
  if (navegacion === 'checklist') {
    vista = <ChecklistView/>;
  } else if (navegacion === 'procesando') {
    vista = <ChargePage/>;
  } else if (navegacion ==='blockstore'){
    vista = <BlockStore/>
  }else if (navegacion === 'pruebas'){
    vista = <Pruebas/>;
  }else if(navegacion === 'feedback'){
    vista = <FeedBack/>
  }else if(navegacion === 'sisterPlant'){
    vista = <SisterPlant/>
  }else{
    vista = <NothingSelectedView />;
  }

  return (
    <ChecklistLayout>
      {vista}
    </ChecklistLayout>
  )
}
