import { useState } from "react";
import styles from "./App.module.css";
import {GridItem} from './components/gridItems';
import {levels, calculetImc, Level} from "./helpers/imc";
import leftArrowImage from "./assets/images/leftarrow.png";


const App = () => {
  const [heightField, setHeightField] = useState<number>(0);
  const [weightField, setWeightField] = useState<number>(0);
  const [toShow,  setToShow] = useState<Level | null>(null);
  
  const handleBackButton = () => {
    setToShow(null);
    setHeightField(0);
    setWeightField(0);
  }
 
  const handleCalculateBtn = () => {
    if( heightField && weightField ){
      setToShow(calculetImc(heightField, weightField));
    } else {
      alert('Peencha todos os campos!');
    }
  }
  return(
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer} >
          IMC 
        </div>
        <span>Criado por <a href="https://github.com/Davi-Soria">Davi Soria</a></span>
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC.</h1>
          <p>O índice de massa corporal (IMC) é uma medida internacional usada para calcular se uma pessoa está no peso ideal. </p>
          
          <input 
          type='number'
          placeholder="Digite a sua altura Ex:1.8 (em métros)"
          value={heightField > 0 ? heightField : ''}
          onChange={e => setHeightField(parseFloat(e.target.value))}
          disabled={toShow ? true : false} />
          
          <input 
          type='number'
          placeholder="Digite o seu peso Ex:80.3 (em kg)"
          value={weightField > 0 ? weightField : ''}
          onChange={e => setWeightField(parseFloat(e.target.value))}
          disabled={toShow ? true : false}/>

          <button onClick={handleCalculateBtn} disabled={toShow ? true : false}> Calcular </button>
        </div>
        <div className={styles.rightSide}>
          {!toShow &&
            <div className={styles.grid}>
            {levels.map((item, key) => (
              <GridItem key={key} item={item} />
            ))}
            </div>
          }
          {toShow &&
            <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick={handleBackButton}>
                <img src={leftArrowImage} alt='' width={25}/>
              </div>
              <GridItem item={toShow}/>
            </div>
          }
          
        </div>
      </div>
    </div>
  )

}
export default App
