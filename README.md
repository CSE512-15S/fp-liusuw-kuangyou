# HIV EVOLVING SITES TOOL
## Team members:
1.	Liusu Wang    liusuw@uw.edu
2.	Kuangyou Yao     kuangyou@uw.edu

![initial discussion](https://cloud.githubusercontent.com/assets/4379884/8109119/f9b19f5a-1009-11e5-87fe-87e5a268713c.png)


## Links:<br />
[Final Paper](Final/paper-liusuw-kuangyou.pdf) <br />
[Poster](Final/poster-liusuw-kuangyou.png) <br />

## Dataset: 
HIV protein sequence from infected individuals

## Project:

### Abstract and Introduction:
This project is to create a visualization tool in aid of studying one of the deadliest viruses known to mankind, the Human immunodeficiency virus, commonly known as HIV. Currently, there is no cure for HIV and most infected individuals succumb to the end-stage disease known as Acquired Immunodeficiency Syndrome, or AIDS. HIV is a retrovirus, which has certain features making it difficult to treat and eradicate including a high mutation rate. Due to its ability to rapidly generate variation, the human immune system cannot easily target the virus as an outside pathogen. What’s worse, the virus also specially infects and destroys human T-cells, which are essential for the immune system to fight diseases. HIV was the culprit responsible for the 1.5 million lives lost globally in the year 2013. (UNAIDS, 2013)

Understanding how the virus evolves in the human body is an important part in defeating this disease. Studies have shown that some individuals possess certain immune genotypes that naturally control virus and significantly delay the progression to AIDS. Hypotheses suggest that it is because their immune system recognize virus through a specific region of the virus shell protein that cannot tolerate mutations very well. Most likely, that part of the protein is crucial to the virus. Without it, the virus cannot survive or maintain its ability to replicate. 

Therefore, it is of interest to discover parts in the virus, which are crucial to virus replication. This information could be critical to informing effective vaccine strategies, and to save more people in the future. The project is also projected to support other kinds of virus evolution which might shows similar pattern as HIV.

Michael Dapp from the UW Microbiology Department provides us with HIV protein sequence data collected from patients infected by the virus in the US. As students studying Computer Science, it is an absolute thrill for us to use our skills and knowledge we learn from the Data Visualization Course and give help in the war against a deadly disease. It would be like Edward Jenner conquered smallpox and John Snow defeated cholera at other time in mankind history. 

Previous Related Work:
HIV envelope regions were sequenced from time of infection until AIDS in nine adult men infected with HIV type 1 In order to help visualize the location and types of mutations that had arisen, large tables were made using Microsoft Excel.  Mutations relative to the original founder virus sequence were color-coded based on specific features.

This is a relatively simple and static visualization of the virus. In order for researchers to highlight a certain cell with color, they would have to click on every single cell for the color. Also because of the long protein sequence highlighting the positions with significant variation, researchers would have to collapse the columns without mutation, neglecting a lot of neighboring positions.



## Work Responsiblities:

Kuangyou Yao: Research, backend implementation, Bar chart implementation, paper
Liusu Wang: Research, table implementation, design, layout, refinement, paper

## Research and development process:

We primarily discuss and learn about the topic with our collaborators. They helped us understand the basic concept and recommended one paper to read. We also conducted research on similiar product and found that the only similiar work that has been done was by excel, which is very time-consuming and lack of flexibility and data analysis. After the initial research we designed and implemented this tool.
Development process:
1.	Implement “Context + Focus via brushing” interactive visualization tool using bioinformatics data. 
2.	Set up a PHP-powered AJAX server
3.	Implement backend python scripts to generate and send back query results.
4.	Implement detailed table part using JavaScript and JQuery UI
5.	Final CSS polish for DOM Element positioning, color, font, etc.

During our development process, we kept doing evaluation and gether feedback from our user to improve the piece. At the end we conduct survey and observation analysis to evaluate our work.



