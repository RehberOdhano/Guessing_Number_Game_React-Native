import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [answer, setAnswer] = React.useState(Math.floor(Math.random() * 10))
  const [tries, setTries] = React.useState(5)
  const [playerScore, setScore] = React.useState(50)
  const [scene, setScene] = React.useState(1)
  const [hint, setHint] = React.useState('')
  const [hintShow, setShow] = React.useState(false)
  const keypad = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]


  useEffect(() => {
    if (tries < 1){
      setScene(3)
    }
  },[tries])

  function gameView() {
    return(
    <View style={styles.container}>
      <Text style={styles.scoreText}>Score: {playerScore}</Text>
      <Text style={styles.scoreText}>{hintShow === true ? hint : null}</Text>
      <View style={styles.numArray}>
        {keypad.map((e) => <TouchableOpacity style={styles.keyBtn}  onPress={() => trial(e)}><Text style={styles.keyText}>{e}</Text></TouchableOpacity>)}
      </View>
      <TouchableOpacity style={styles.keyBtn} onPress={checkHint} disabled={hint === '' ? true : hintShow}><Text style={styles.keyText}>Hint</Text></TouchableOpacity>
    </View>
    )
  }

  function checkHint() {
    setScore(playerScore - 5)
    setShow(!hintShow)
  }

  function trial(key){
    if (key > answer){
      setHint('Number > Guess')
      setScore(playerScore - 5)
      setTries(tries - 1)
    } else if(key < answer) {
      setHint('Number < Guess')
      setScore(playerScore - 5)
      setTries(tries - 1)
    } else {
      setScene(3)
    }
  }

  function endView() {
    return(
      <View style={styles.container}>
        <Text style={styles.endText}>Score: {playerScore}</Text>
        <Text style={styles.endText}>Tries: {tries}</Text>
        <TouchableOpacity style={styles.endBtn} onPress={restart}><Text style={styles.endText}>Play Again</Text></TouchableOpacity>
        <TouchableOpacity style={styles.endBtn} onPress={end}><Text style={styles.endText}>Home</Text></TouchableOpacity>
      </View>
    )
  }

  function startView(){
    return(
      <View style={styles.container}>
        <Text style={styles.stHeading}>Guessing Game</Text>
        <TouchableOpacity style={styles.stBtn} onPress={()=> {setScene(2)}}><Text style={styles.stText}>Start game!</Text></TouchableOpacity>
      </View>
    )
  }

  function restart(){
    setScene(2)
    setAnswer(Math.floor(Math.random() * 10))
    setTries(5)
    setHint('')
    setScore(50)
  }

  function end(){
    setScene(1)
    setAnswer(Math.floor(Math.random() * 10))
    setTries(5)
    setHint('')
    setScore(50)
  }

  return (
    <View style={styles.container}>
      {scene === 1 ? startView() : (scene === 2 ? gameView() : endView())}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyBtn: {
    backgroundColor: 'blue',
    padding: 5,
    borderRadius: 20,
    padding: 5,
    width: 'calc(33% - 40px)',
    height: 50,
    margin: 20,
    alignItems: 'center'
  },
  keyText: {
    fontSize: 24,
    color: 'white'
  },
  numArray: {
    backgroundColor: 'lightgrey',
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 20
  },
  scoreText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20
  },
  stBtn: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 20,
    margin: 20
  },
  stText: {
    fontSize: 30,
    color: 'white'
  },
  stHeading: {
    fontSize: 40,
    color: 'black'
  },
  endText: {
    fontSize: 30,
    margin: 10,
    color: 'white'
  },
  endBtn: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 20,
    margin: 20
  }
});
