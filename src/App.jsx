// Компонент - строительный блок, котырый используется для
// разделения маштабного кода, далее компонент должен быть подключен 
// в index.js, чтобы быть отображенным в html 

// JSX - html+js

// Функциональный компонент - функция которая возвращает html

// В реакте вместо class --> className 

import './App.css'
import Up from './images/up.png'
import Down from './images/down.png'
import Cheese from './images/cheese.png'
import Meat from './images/meat.png'
import Tomato from './images/tomato.png'
import Salad from './images/salad.png'
import { useState, useEffect } from 'react'
import { Cart } from './cart'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// function App() {

// }

//или 

// let state = [state, function]
// stste[0], state[1]
// Деструктуризация массива
// let [element1, element2] = state 
// const [состояние, обновитьСостояние] = useState (начальноеСостояние)

// Событие клика
// аттрибут oneClick={function}
// onClick={() => function(arguments)}

const App = () => {
    const [hamburger, setHamburger] = useState([])
    const [price, setPrice] = useState(20)
    const [cart, setCart] = useState([])
    const [active, setActive] = useState(false)

    const template = /(order)/
    const localStorageItems = Object.keys(localStorage).filter((key) => {
        return key.match(template)
    })

    useEffect(() => {
        const orders = localStorageItems.map((order) => {
            return JSON.parse(localStorage[order])
        })

        if (orders) {
            setCart(orders)
        }

        console.log(orders)
    }, [])


    function addUnit(unit) {
        setHamburger([...hamburger, { id: hamburger.length, ...unit }])
        setPrice((prevState) => {
            return prevState + unit.price
        })
    }

    function removeUnit(id, price) {
        setHamburger(hamburger.filter((unit) =>{
            return unit.id !== id
        }))
        setPrice((prevState) => {
            return prevState - price
        })
    }


    function addToCart(item) {
        setCart([ ...cart, { id: cart.length, total: price, units: [...item] }])
        localStorage.setItem(`order${cart.length}`, JSON.stringify({ id: cart.length, total: price, units: [...item] }))
        setHamburger([])
        setPrice(20)

        toast.success("Burger has been added to cart!", {
            position: "top-right",
            autoClose: 5000,
        })
    }


    let hamburgerButtons = [
        { text: 'cheese', img: Cheese, price: 55 },
        { text: 'meat', img: Meat, price: 70 },
        { text: 'tomato', img: Tomato, price: 25 },
        { text: 'salad', img: Salad, price: 20 }
    ]

    return(
        <section className='app'>
            <div className='container'>
                <div className='app__price'>
                    <h2>{ price } som</h2>
                </div>
                <div className='app__block'>
                    <div className="app__hamburger">
                        <img src= { Up } alt="up" />
                        {
                            hamburger.map((unit, index) => {
                                return <img key={ index } onClick={() => removeUnit(unit.id, unit.price)} src={ unit.img } alt= { unit.text }  />
                            })
                        }
                        <img src= { Down } alt="down" />
                    </div>
                    <div className="app__buttons">
                        <h2>Add</h2>
                        {
                            hamburgerButtons.map((button,index) => {
                                return <button key={ index } onClick={ () => addUnit(button) }>{ button.text }</button>
                            })
                        }
                        <div className='app__cart'>
                            <button onClick={ () => addToCart(hamburger) }>Add to cart</button>
                            <button onClick={ () => setActive((!active))}>
                                <span className='material-icons'>shopping_cart</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
            {
                active ? <Cart setActive={setActive} /> : null
            }
        </section>
    )
}

export default App

// export App --> import {App}
// export default App --> import App

// array.map((element, index, array) => {})
//...спрет оператор

//array.map(() => {
//  return <htmlElement key={}></htmlElement>
//})


//useEff ect(() => {}, [])
//[] --> сработает только один раз, когда открывается приложение 
//[states, server calls] --> будет работать каждый раз, 
//когда переданные значения в массиве обновляются