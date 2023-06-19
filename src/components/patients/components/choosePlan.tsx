import React, { useState } from "react";
import styles from "../../../../pages/patient/CheckoutPlans/checkout.module.scss";
import { useRouter } from "next/router";
import { Grid, Typography, Checkbox } from "@mui/material";
// import Logo from '../../public/logo_black.png'
import { Box } from "@mui/system";
import { IPlan, IProgram } from "src/interfaces";

type ChoosePlanProps = {
  onClick: () => void;
  programs: IProgram[];
  plans: IPlan[];
  planSelected: IPlan;
  setPlanSelected: React.Dispatch<React.SetStateAction<IPlan | undefined>>;
  setPrograms: React.Dispatch<React.SetStateAction<IProgram[]>>;
};

export default function ChoosePlan({
  onClick,
  programs,
  planSelected,
  setPlanSelected,
  setPrograms,
  plans,
}: ChoosePlanProps) {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState<any>([false, true, false]);
  const [programsSelected, setProgramsSelected] = useState([]);

  // const plans = [
  //   {
  //     id: 0,
  //     title: 'Plano de',
  //     name: 'Saúde geral',
  //     description:
  //       'Tenha descontos nas consultas e receba uma pré-avaliação gratuita.',
  //     value: '10',
  //     tags: ['Pré avaliação gratuita'],
  //   },
  // ]

  const onChangeCheckbox = () => {
    console.log("Checkbox changed");
    // setPrograms({ ...programs, selected: !programs.selected })
  };

  function BoxPrograms(props: any) {
    return (
      <Box className={styles.more}>
        <div
          className={styles.row}
          style={{
            justifyContent: "space-between",
          }}
        >
          <div className={styles.row}>
            <Checkbox
              checked={props.programs.selected}
              onClick={() => onChangeCheckbox()}
            />
            <div>
              <Typography
                variant="body2"
                fontWeight={"medium"}
                className={styles.titleProgram}
              >
                {props.programs.title}
              </Typography>
              <Typography variant="h4" className={styles.textProgram}>
                {props.programs.text}
              </Typography>
            </div>
            <Typography
              variant="body2"
              fontWeight={"medium"}
              className={styles.valueProgram}
            >
              +{props.programs.value}/mês
            </Typography>
          </div>
        </div>
      </Box>
    );
  }

  return (
    <Grid xs={7} className={styles.gridContent}>
      <Typography
        variant="subtitle1"
        fontWeight={"medium"}
        className={styles.title}
      >
        Checkout
      </Typography>
      <Typography variant="h3" className={styles.subtitle}>
        Plano selecionado
      </Typography>
      {plans.map((item, index) => (
        <Box key={item.id}>
          <Box
            onClick={() => setPlanSelected(item)}
            className={
              planSelected !== undefined && planSelected.id === item.id
                ? styles.boxPlanSelected
                : styles.boxPlan
            }
          >
            <Box className={styles.boxContent}>
              <div>
                <Typography variant="h4" className={styles.cardTitle}>
                  Plano de
                </Typography>
                <Typography
                  variant="h2"
                  fontWeight={"bold"}
                  className={styles.cardName}
                >
                  {item.name}
                </Typography>
                {/* <div className={styles.row}>
                  {item.tags.map((tag) => (
                    <Typography variant="body1" className={styles.cardTag}>
                      {tag}
                    </Typography>
                  ))}
                </div> */}
                <Typography variant="h4" className={styles.cardSubtitle}>
                  {item.description}
                </Typography>
              </div>
              <div>
                {planSelected !== undefined && planSelected.id === item.id ? (
                  <Box className={styles.cardTag}>
                    <Typography variant="body1" sx={{ color: "white" }}>
                      Selecionado
                    </Typography>
                  </Box>
                ) : null}

                <div
                  className={styles.row}
                  style={{ alignItems: "baseline", marginTop: "5px" }}
                >
                  <Typography variant="h4">R$</Typography>
                  <Typography
                    variant="h1"
                    fontWeight={"bold"}
                    className={styles.cardValue}
                  >
                    {item.price}
                  </Typography>
                  <Typography variant="h4">/mês</Typography>
                </div>
              </div>
            </Box>
          </Box>
        </Box>
      ))}
      {/* <Typography
        variant="h3"
        fontWeight={"medium"}
        className={styles.titleBold}
      >
        Adquira programas com condições especiais para o seu plano:
      </Typography> */}
      {/* <BoxPrograms programs={programs}></BoxPrograms> */}
    </Grid>
  );
}
