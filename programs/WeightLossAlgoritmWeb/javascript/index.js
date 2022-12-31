activity_lvl_options = {'Sedentary': 1.2, 'Light': 1.375, 'Moderate': 1.5, 'High Intensity': 1.725, 'Very High Intensity': 1.9};
weight_options = {'M':6.25, 'F':4.35};
height_options = {'M':12.7, 'F':4.7};
age_options = {'M': 6.76, 'F': 4.68};
number_options = {'M': 66, 'F': 655};

// Run on Start Up

weightData();
heightData();
ageData();
weekData();
weekLossData();

function getName(){
    return document.getElementById('title').value;

}

function getWeight(){
    weight = parseFloat(document.getElementById('weight').value);
    return weight;

}

function getHeight(){
    height = parseFloat(document.getElementById('height').value);
    return height;
}

function getAge(){
    age = parseInt(document.getElementById('age').value);
    return age;
}

function getActivity(){
    return document.getElementById('activity_lvl').value;
}

function getGender(){
    return document.getElementById('gender').value;
}

function getNumofWeeks(){
    num_weeks = parseInt(document.getElementById('weeks').value);
    return num_weeks;

}

function getWeeklyLoss(){
    weekly_loss = parseFloat(document.getElementById('weekly_loss').value);
    return weekly_loss;
}

function getMinCalories(){
    min_cals = parseInt(document.getElementById('min_cals').value);
    return min_cals;
}

function Activity(activity_lvl){
    if (activity_lvl in activity_lvl_options){
        return self.activity_lvl_options[activity_lvl]
    }
    else{
        throw IndexError("This is not an Available Activity Level")
    }
}

function Weight(gender, weight){
        if (typeof(gender, weight) == 'number' || typeof(weight) == 'float'){
            return weight_options[gender] * weight;
        }
        else{
            throw TypeError('Weight must be a Number');
        }
}


function Height(gender, height){
    if (typeof(height) == 'number' || typeof(height) == 'float'){
        return height_options[gender] * height;
    }
    else{
        throw TypeError('Height must be a Number');
    }
}

function Age(gender, age){
    if (typeof(age) == 'number'){
        return age_options[gender] * age;
    }
    else{
        throw TypeError('Age must be a Number');
    }
}

function Gender(gender){
    if (gender in number_options){
        return number_options[gender];
    }
    else{
        throw IndexError("This is not an allowed Gender");
    }
}

function GetTDEE(activity, gender, weight, height, age){
    return Activity(activity)*Weight(gender, weight)+Height(gender, height)-Age(gender, age)+Gender(gender);
}

function GetAllowed(activity, gender, weight, height, age, weekly_loss){
    return GetTDEE(activity, gender, weight, height, age) - (weekly_loss *(3500 / 7))
}

function GetBMI(weight, height){
    return 703 * weight / (height * height);
}

// Adding to HTML

function weightData(){
    dropdown = document.getElementById('weight');

    x= 50;
    while(x <= 1000){
        option = document.createElement('option');
        option.innerHTML = x;
        dropdown.appendChild(option);
        x+=1;
    }
}

function heightData(){
    dropdown = document.getElementById('height');

    x= 20;
    while(x <= 108){
        option = document.createElement('option');
        option.innerHTML = x;
        dropdown.appendChild(option);
        x+=1;
    }
}

function ageData(){
    dropdown = document.getElementById('age');

    x= 18;
    while(x <= 125){
        option = document.createElement('option');
        option.innerHTML = x;
        dropdown.appendChild(option);
        x+=1;
    } 
}

function weekData(){
    dropdown = document.getElementById('weeks');

    x= 1;
    while(x <= 52){
        option = document.createElement('option');
        option.innerHTML = x;
        dropdown.appendChild(option);
        x+=1;
    } 
}

function weekLossData(){
    dropdown = document.getElementById('weekly_loss');

    x= 0;
    while(x <= 10){
        option = document.createElement('option');
        option.innerHTML = x;
        dropdown.appendChild(option);
        x+=.5;
    }
}

function addRow(week, weight, tdee, allowed, bmi){
    list1 = [week, weight, tdee, allowed, bmi];
    table = document.getElementById('table_results');
    tr = document.createElement('tr');
    tr.setAttribute('id', 'table_results_row');
    list1.forEach(element => {
        td = document.createElement('td');
        td.setAttribute('class', 'table_results_row_item');
        td.innerHTML = element;
        tr.appendChild(td);
    });
    table.appendChild(tr);
}

function removeTable(){
    table = document.getElementById('table_results');
    if (table)
        table.remove();
}

function addTable(){
    container = document.getElementById('table_container');
    table = document.createElement('table');
    table.setAttribute('id', 'table_results');

    tr = document.createElement('tr');

    weeks = document.createElement('th');
    weeks.innerHTML = 'Weeks';
    
    weight = document.createElement('th');
    weight.innerHTML = 'Weight';

    tdee = document.createElement('th');
    tdee.innerHTML = 'TDEE';

    daily_allowed = document.createElement('th');
    daily_allowed.innerHTML = 'Daily Allowed';
    
    bmi = document.createElement('th');
    bmi.innerHTML = 'BMI';

    tr.appendChild(weeks)
    tr.appendChild(weight)
    tr.appendChild(tdee)
    tr.appendChild(daily_allowed)
    tr.appendChild(bmi)
    table.appendChild(tr);
    container.appendChild(table);
}

function main(){

    removeTable()
    addTable()

    activity = getActivity();
    weight = getWeight();
    height = getHeight();
    age = getAge();
    gender = getGender();
    weekly_loss = getWeeklyLoss();

    tdee = GetTDEE(getActivity(), getGender(), getWeight(), getHeight(), getAge()).toFixed(1);
    allowed = GetAllowed(getActivity(), getGender(), getWeight(), getHeight(), getAge(), getWeeklyLoss()).toFixed(1);
    bmi = GetBMI(getWeight(), getHeight()).toFixed(1);

    i = 0;
    while(i < getNumofWeeks()){
        if(allowed < getMinCalories()){
            weekly_loss = weekly_loss - .5;
            tdee = GetTDEE(activity, gender, weight, height, age).toFixed(1);
            allowed = GetAllowed(activity, gender, weight, height, age, weekly_loss).toFixed(1);
            bmi = GetBMI(weight, height).toFixed(1);
            continue;
        }

        week = i + 1;
        addRow(week, weight, tdee, allowed, bmi);
        weight = weight - weekly_loss;
        tdee = GetTDEE(activity, gender, weight, height, age).toFixed(1);
        allowed = GetAllowed(activity, gender, weight, height, age, weekly_loss).toFixed(1);
        bmi = GetBMI(weight, height).toFixed(1);
        i+=1;

        if(i >= 52){
            break;
        }
    }


}