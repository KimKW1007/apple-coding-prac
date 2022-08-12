/* eslint-disable */

import './App.css';
import { useEffect, useState } from 'react';


function App(){
  const [title, setTitle] = useState(["남원역 맛집","홍대역 맛집","무릉도원역 맛집"]);
  const [counter, setCounter] = useState([0,0,0]);
  const [isModal , setIsModal] = useState(false);
  const [selected, setSelected] = useState(0);
  const [inputVal,setInputVal] = useState('');

  const plusCount = (idx)=>{
    let copyCounter = [...counter];
    copyCounter[idx] += 1;
    setCounter(copyCounter);
  }
  const deleteFn= (idx)=>{
    const deleteTitle = [...title];
    /* let deleteFilter = deleteTitle.filter((obj, index) => index != idx ); */
    deleteTitle.splice(idx,1);
    setTitle(deleteTitle);
  }
  useEffect(()=>{
    deleteFn
  },[title])
  
   
  const list = title.map((ele,idx)=>(
      <div className='list' key={idx}>
         <h4 onClick={()=>{idx != selected ? null : setIsModal(!isModal); setSelected(idx);}}>{ele}<span onClick={(e)=>{e.stopPropagation(); plusCount(idx)}} >👍</span>{counter[idx]}</h4>
         <p>2월 17일 발행</p>
         <button onClick={()=>{deleteFn(idx);}} >삭제</button>
       </div>
  ));

  const chnageInput = (e)=>{
    setInputVal(e.target.value);
  }
  useEffect(()=>{
    chnageInput
  },[inputVal])

  const updateFn = ()=>{
    if(inputVal == ''){
      alert('내용을 입력해주세요!');
      return;
    }
    let _title = [...title];
    _title.unshift(inputVal);
    let _counter = [...counter];
    _counter.unshift(0);
    setCounter(_counter);
    setTitle(_title);
    setInputVal('');
  }


  return(
    <div className='App'>
       <div className='black-nav'>
         <h4>BlackBlog</h4>
       </div>
       {list}
       <input type="text" onChange={(e)=>{chnageInput(e)}} value={inputVal} />
       <button onClick={updateFn}>추가</button>
       {isModal  ? <Modal title={title} selected={selected}/> : null}
    </div>
  )
}


function Modal({title,selected}) {
  return(
    <div className="modal">
      <h4>{title[selected]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button>글수정</button>
    </div>
  )
}

export default App;
