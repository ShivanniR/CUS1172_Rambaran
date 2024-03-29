document.addEventListener('DOMContentLoaded', function(){
    backEndRestAPI("questionsQ1", 1, "#initialScreen");

    document.querySelector('#display-data').addEventListener('click', (e) => {
        handleViewEvents(e);
    });

    return false;
});

let counter = 0;

handleViewEvents = (e) => {
    if (e.target.type != 'radio'){
        e.preventDefault();
    }

    if (e.target.dataset.viewaction == "startQuiz"){
        var name = document.querySelector('#name').value;
        console.log(name);

        qid = 1;

        if((document.querySelector('#quiz-selection').value === "1")){
            quizID = "questionsQ1";
            console.log(quizID);
            backEndRestAPI(quizID, qid, "#quiz_view1");
        }
        else if(document.querySelector('#quiz-selection').value === "2"){
            quizID = "questionsQ2";
            console.log(quizID);
            backEndRestAPI(quizID, qid, "#quiz_view1");
        }
        return false;
    }

    console.log(qid);
    console.log(quizID);


    if(e.target.dataset.viewaction == "continue" && e.target.dataset.currentquestionid == 1){
        backEndRestAPI(quizID, qid, "#quiz_view2");
        console.log(qid);
        console.log(counter);
    }
    else if(e.target.dataset.viewaction == "continue" && e.target.dataset.currentquestionid == 2){
        backEndRestAPI(quizID, qid, "#quiz_view1");
        console.log(qid);
    }
    else if(e.target.dataset.viewaction == "continue" && e.target.dataset.currentquestionid == 3){
        backEndRestAPI(quizID, qid, "#quiz_view3");
        console.log(qid);
    }


    else if((e.target.dataset.viewaction == "continue" && qid > 5 && counter/5 >= 0.8)){
        backEndRestAPI(quizID, qid, "#finalScreenPassed");
        console.log(counter);
        console.log(counter/5);
        document.querySelector('#name').innerHTML = name;
    }

   
    else if((e.target.dataset.viewaction == "continue" && qid > 5 && counter/5 < 0.8)){
        backEndRestAPI(quizID, qid, "#finalScreenFailed");
        console.log(counter);
        console.log(counter/5);
        console.log(name);
        document.querySelector('#name').innerHTML = name;
    }

    
       
    if(e.target.dataset.viewaction == "return"){
        qid = 0;
        backEndRestAPI("questionsQ1", 1, "#initialScreen");
    }
    if(e.target.dataset.viewaction == "re-take"){
        qid = 1;
        backEndRestAPI(quizID, 1, "#quiz_view1");
    }

    if(e.target.type == 'radio'){
        if(e.target.value == document.querySelector('#form').dataset.correctChoice){
            rightAnswer = true;
            console.log(e.target.value);
            console.log(document.querySelector('#form').dataset.correctChoice);
            console.log(rightAnswer);
        }
        else{
            rightAnswer = false;
            console.log(e.target.value);
            console.log(document.querySelector('#form').dataset.correctChoice);
            console.log(rightAnswer);
        }
    }
    if(e.target.dataset.viewaction == "nextQuestion" && qid == 2){
        if(document.querySelector('#narrativeAnswer').value == document.querySelector('#form').dataset.correctChoice){
            rightAnswer = true;
            console.log(e.target.value);
            console.log(document.querySelector('#form').dataset.correctChoice);
            console.log(rightAnswer);
        }
        else{
            rightAnswer = false;
            console.log(e.target.value);
            console.log(document.querySelector('#form').dataset.correctChoice);
            console.log(rightAnswer);
        }
    }

    if(e.target.dataset.viewaction == "nextQuestion"){
        console.log('Next Question Button has been clicked');
        console.log(rightAnswer);
    
    if (rightAnswer === true){
        backEndRestAPI(quizID, qid, "#correct");
        qid = qid +1;

        setTimeout(() => {
            if(qid == 2){
                console.log('qid:' + qid);
                backEndRestAPI(quizID, qid, "#quiz_view2");
                console.log('qid:' + qid);
            }
            else if(qid == 4){
                console.log(qid);
                backEndRestAPI(quizID, qid, "#quiz_view3");
                console.log('qid:' + qid);
            }
            else if(qid == 3 || qid == 5){
                console.log(qid);
                backEndRestAPI(quizID, qid, "#quiz_view1");
            }
            else if(qid > 5 && counter/5 >= 0.8){
                console.log(qid);
                backEndRestAPI(quizID, qid, "#finalScreenPassed");
            }
            else if(qid > 5 && counter/5 < 0.8){
                console.log(qid);
                backEndRestAPI(quizID, qid, "#finalScreenFailed");
            }
        }, 1000);
        counter++;
        document.querySelector('#counter').innerHTML = counter;
        rightAnswer = null;
    }

    else if(rightAnswer === false){
        backEndRestAPI(quizID, qid, "#incorrect");
        qid = qid +1;
        rightAnswer = null;

    }
    return false;
    }
    return false;
};

const backEndRestAPI = async (quizID, qid, view) => {
    let element = document.querySelector(view);

    if (!element) {
        console.error(`Element with view ${view} not found`);
        return;
    }

    let api_endpoint = `https://my-json-server.typicode.com/ShivanniR/CUS1172_Rambaran/${quizID}/${qid}`;
    try {
        const response = await fetch(api_endpoint);
        const data = await response.json();
        console.log(data);
        const html_element = renderView(data, view);
        element.innerHTML = html_element;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};


const renderView = (data, view) => {
    source = document.querySelector(view).innerHTML;
    var template = Handlebars.compile(source);
    var html = template(data);
    return html;
}

