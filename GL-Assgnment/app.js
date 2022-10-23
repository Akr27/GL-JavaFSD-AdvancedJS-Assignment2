"use strict";

import resume from './Data.json' assert {type:'json'};

var candId=0;
const resume_count=resume.length;
var resume_filtered_array=[];



$(document).ready(function(){        

    for(var i=1;i<=resume_count;i++){
        resume_filtered_array.push(i);
    }

    console.log("rsArray: "+resume_filtered_array+" id: "+candId);

    loadResumes(resume_filtered_array);


    $("#filter-btn").click(function(){

        resume_filtered_array.splice(0,resume_filtered_array.length);
        
        var filter_txt=searchbox.value.toLowerCase().trim();
        
        if(filter_txt!=""){
            for(var ind=0;ind<resume_count;ind++){
                var job_app=resume[ind].basics.AppliedFor.toLowerCase();
                if(job_app.indexOf(filter_txt)>=0){
                    resume_filtered_array.push(ind+1);
                }
            }
        }
        else{
            for(var i=1;i<=resume_count;i++){
                resume_filtered_array.push(i);
            }
        }        

        loadResumes(resume_filtered_array);      
        
        

        searchbox.value="";
        
    })

    $("#prev-btn").click(function(){
        $("#next-btn").css("visibility","visible");
        displayResume(resume_filtered_array[resume_filtered_array.indexOf(candId)-1]);
        if(resume_filtered_array.indexOf(candId)==0){
            $(this).css("visibility","hidden");
        }
    });      

    $("#next-btn").click(function(){
        $("#prev-btn").css("visibility","visible");;
        var test1=resume_filtered_array.indexOf(candId)+1;
        displayResume(resume_filtered_array[resume_filtered_array.indexOf(candId)+1]);console.log("TEST: "+test1);
        if(resume_filtered_array.indexOf(candId)==resume_filtered_array.length-1){
            $(this).css("visibility","hidden");
        }
    });

});

function loadResumes(resumeArray){  
    
    if(resumeArray.length<=1){
        $("#nav-wrapper").css("visibility","hidden");
        $("#prev-btn").css("visibility","hidden");
        $("#next-btn").css("visibility","hidden");
    }
    else{
        $("#nav-wrapper").css("visibility","visible");
        $("#prev-btn").css("visibility","visible");
        $("#next-btn").css("visibility","visible");
    }

    if(resumeArray.length==0){
        $("#resume-wrapper").css("display","none");
        $("#resume-wrapper-fail").load("no_results.html");
        $("#resume-wrapper-fail").css("display","block");
        console.log("rsAR():case 1  rsArray: "+resumeArray+" id: "+candId);
        //candId=0; resume_filtered_array=[];
        
    }
    else{
        //$("#resume-wrapper").load("resume_format.html");
        $("#resume-wrapper").css("display","block");
        $("#resume-wrapper-fail").css("display","none");
        displayResume(resumeArray[0]);
        $("#prev-btn").css("visibility","hidden");
        console.log("rsAR():case 2  rsArray: "+resumeArray+" id: "+candId);
        
    } 

}

function displayResume(cand_id){    
    console.log("dispR1()  rsArray: "+resume_filtered_array+" id: "+candId);

    $("#cand_name").text(resume[cand_id-1].basics.name);
    $("#cand_job").text(resume[cand_id-1].basics.AppliedFor);
    $("#personal-info").html(resume[cand_id-1].basics.phone+"<br>"+resume[cand_id-1].basics.email+"<br><a href='"+
        resume[cand_id-1].basics.profiles.url+"'>"+resume[cand_id-1].basics.profiles.network+"</a>");

    var skill_count=resume[cand_id-1].skills.keywords.length;
    var skills="";
    for(var i=0;i<skill_count;i++){
        skills=skills+resume[cand_id-1].skills.keywords[i]+"<br>";
    }    
    $("#tech-skills").html(skills);

    var hob_count=resume[cand_id-1].interests.hobbies.length;
    var hobbies="";
    for(var i=0;i<hob_count;i++){
        hobbies=hobbies+resume[cand_id-1].interests.hobbies[i]+"<br>";
    }    
    $("#hobbies").html(hobbies);

    $("#comp_name").text(resume[cand_id-1].work['Company Name']);
    $("#position").text(resume[cand_id-1].work.Position);
    $("#start_date").text(resume[cand_id-1].work['Start Date']);
    $("#end_date").text(resume[cand_id-1].work['End Date']);
    $("#summary").text(resume[cand_id-1].work.Summary);

    $("#proj_name").text(resume[cand_id-1].projects.name+": ");
    $("#proj_desc").text(resume[cand_id-1].projects.description);

    $("#ug").text(resume[cand_id-1].education.UG.institute+", "+resume[cand_id-1].education.UG['Start Date']+", "+resume[cand_id-1].education.UG['End Date']+", "+resume[cand_id-1].education.UG.cgpa);
    $("#pu").text(resume[cand_id-1].education['Senior Secondary'].institute+", "+resume[cand_id-1].education['Senior Secondary'].cgpa);
    $("#hs").text(resume[cand_id-1].education['High School'].institute+", "+resume[cand_id-1].education['High School'].cgpa);

    $("#intern_comp").text(resume[cand_id-1].Internship['Company Name']);
    $("#intern_pos").text(resume[cand_id-1].Internship.Position);
    $("#intern_start").text(resume[cand_id-1].Internship['Start Date']);
    $("#intern_end").text(resume[cand_id-1].Internship['End Date']);
    $("#intern_sum").text(resume[cand_id-1].Internship.Summary);

    var ach_count=resume[cand_id-1].achievements.Summary.length;
    var ach="<ul>";
    for(var i=0;i<ach_count;i++){
        ach=ach+"<li>"+resume[cand_id-1].achievements.Summary[i]+"</li>";
    }
    ach=ach+"</ul>";
    $("#achievements").html(ach);

    candId=cand_id;
    console.log("dispR2()  rsArray: "+resume_filtered_array+" id: "+candId);

}