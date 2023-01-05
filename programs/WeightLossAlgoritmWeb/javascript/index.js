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

function removeCals(){
    min = document.getElementById('min_cals');
    console.log(min.length);
    count = 0;
    while(min.length > 0){
        try{
            min.remove(count);
        }
        catch{
            break;
        }
    }
}

function getMinCals(){
    removeCals();
    gender = document.getElementById('gender').value;

    min = document.getElementById('min_cals');
     
    male = 1500;
    female = 1200;
    count = 0;

    while(count <= 10){
        if(gender == 'M'){
            option = document.createElement('option');
            option.innerHTML = male;
            min.appendChild(option);
            male += 50;
            count += 1;
        }
        else if(gender == 'F'){
            option = document.createElement('option');
            option.innerHTML = female;
            min.appendChild(option);
            female += 50;
            count += 1;
        }
        else{
            console.log(gender);
            break;
        }
    }

    
}

function addTableRow(week, weight, tdee, allowed, bmi){
    list1 = [week, weight, tdee, allowed, bmi];
    list2 = ['Week', 'Weight', 'TDEE', 'Daily Allowed', 'BMI'];
    table = document.getElementById('table_results');
    tr = document.createElement('tr');
    tr.setAttribute('id', 'table_results_row');

    count = 0;
    list1.forEach(element => {
        td = document.createElement('td');
        td.setAttribute('class', 'table_results_row_item');
        td.setAttribute('label', list2[count])
        td.innerHTML = element;
        tr.appendChild(td);
        count += 1;
        if (count == 5){
            count = 0;
        }
    });
    table.appendChild(tr);
}

function addListRow(week, weight, tdee, allowed, bmi){
    list = document.getElementById('list_results');

    weeks_td = document.createElement('dt');
    weeks_dd = document.createElement('dd');

    weeks_td.innerHTML = "Week";
    weeks_dd.innerHTML = week;


    list.appendChild(weeks_td);
    list.appendChild(weeks_dd);

    weight_td = document.createElement('dt');
    weight_dd = document.createElement('dd');

    weight_td.innerHTML = "Weight";
    weight_dd.innerHTML = weight;

    list.appendChild(weight_td);
    list.appendChild(weight_dd);

    tdee_td = document.createElement('dt');
    tdee_dd = document.createElement('dd');

    tdee_td.innerHTML = "TDEE";
    tdee_dd.innerHTML = tdee;

    list.appendChild(tdee_td);
    list.appendChild(tdee_dd);

    daily_td = document.createElement('dt');
    daily_dd = document.createElement('dd');

    daily_td.innerHTML = "Daily Allowed";
    daily_dd.innerHTML = allowed;

    list.appendChild(daily_td);
    list.appendChild(daily_dd);

    bmi_td = document.createElement('dt');
    bmi_dd = document.createElement('dd');

    bmi_td.innerHTML = "BMI";
    bmi_dd.innerHTML = bmi

    list.appendChild(bmi_td);
    list.appendChild(bmi_dd);

}

function removeList() {
    list = document.getElementById('list_results');
    if (list)
        list.remove();
}

function addList() {
    container = document.getElementById('list_container')
    list = document.createElement('dl');
    list.setAttribute('id', 'list_results');

    container.appendChild(list);
    
}
function removeTable(){
    table = document.getElementById('table_results');
    if (table)
        table.remove();
}

function addTable(){
    container = document.getElementById('table_container');
    table = document.createElement('table');
    table_head = document.createElement('thead');
    table_body = document.createElement('tbody');

    table.setAttribute('id', 'table_results');

    tr = document.createElement('tr');

    weeks = document.createElement('th');
    weeks.setAttribute('id', 'week_th');
    weeks.innerHTML = 'Week';
    
    weight = document.createElement('th');
    weight.setAttribute('id', 'weight_th');
    weight.innerHTML = 'Weight';

    tdee = document.createElement('th');
    tdee.setAttribute('id', 'tdee_th');
    tdee.innerHTML = 'TDEE';

    daily_allowed = document.createElement('th');
    daily_allowed.setAttribute('id', 'daily_allowed_th');
    daily_allowed.innerHTML = 'Daily Allowed';
    
    bmi = document.createElement('th');
    bmi.setAttribute('id', 'bmi_th');
    bmi.innerHTML = 'BMI';

    tr.appendChild(weeks);
    tr.appendChild(weight);
    tr.appendChild(tdee);
    tr.appendChild(daily_allowed);
    tr.appendChild(bmi);
    table.appendChild(table_head);
    table.appendChild(table_body);
    table_head.appendChild(tr);
    container.appendChild(table);
}

function main(){

    removeTable();
    addTable();

    removeList();
    addList();

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
        addTableRow(week, weight, tdee, allowed, bmi);
        addListRow(week, weight, tdee, allowed, bmi);
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