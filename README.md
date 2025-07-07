# EcoMate 

## Introduction 
Growing environmental concerns necessitate actionable tools for individuals and communities to understand and mitigate their carbon footprint. While many solutions focus on individual tracking, there's a clear need for a platform that fosters a community-driven approach to collective environmental impact. This application, "EcoMate," aims to empower local communities to collaboratively monitor, manage, and reduce their carbon footprint through shared goals, gamified challenges, and resource sharing, transforming individual awareness into tangible collective action. 

## Problem Statement 
Current tools for managing carbon footprints are often individualized, lacking features that encourage and simplify community collaboration towards shared sustainability goals. This creates a gap where the potential for collective impact through shared learning, motivation, and friendly competition is underutilized. 
The core challenge is to develop "EcoMate," a web application that allows users to track their carbon-emitting activities, join or create communities, participate in community-based reduction challenges, share sustainable practices, and visualize both individual and collective progress towards environmental sustainability goals. 

## Stakeholders 
1.  Individuals: Environmentally conscious citizens, students, members of local clubs or organizations seeking to reduce their personal and household carbon footprint. 
2. Community Leaders/Organizers: Individuals who wish to initiate and manage sustainability efforts within their neighborhoods, workplaces, educational institutions, or social groups. 

## 🛠️ Tech Stack

### 🔹 Frontend (Angular)

- Angular 17 (standalone components)
- Angular Routing
- Firebase for google auth Signin

### 🔹 Backend (Node.js + Express)

- Express.js REST API
- JWT authentication
- MongoDB
- Multer (file upload for media posts)
  
## Scope and System Capabilities 
EcoMate should provide a comprehensive suite of functionalities enabling users to effectively track, manage, and reduce their carbon footprint, both individually and as part of a community. The system's capabilities should encompass the following areas: 
1. User Account and Profile Management:
   - The system must allow users to securely register and manage their accounts (e.g., via email/password, with consideration for OAuth options).Each user shall have a personal profile space to manage their information and preferences

    - Users should be ableto set personal carbon footprint reduction goals and track their progress towards these goals via a personalized dashboard displaying their footprint over time and logged activities. 

3. Carbon Footprint Calculation and Activity Logging: 
   - EcoMate must provide a simplified yet effective tool for users to estimate their baseline carbon footprint across common categories such as transportation, home energy consumption, and dietary choices. 

   - Users must be able to manually log specific carbon-emitting activities (e.g., kilometers driven, type of transport used, energy consumed) and positive, carbon-saving actions (e.g., choosing sustainable transport, reducing meat consumption, tree planting).

4. Community Formation and Management: 
   - The platform must empower users to create new communities based on shared interests or affiliations (e.g., a neighborhood group, a corporate sustainability team, a university eco-club). 

   - Users should be able to search for, discover, and request to join existing communities. 

   - Each community will require a dedicated space (community dashboard) to display aggregated, anonymized data reflecting the collective footprint, progress towards group goals, and overall impact. 

5. Collaborative Challenges and Engagement: 
   - The system should support the creation and management of community-wide sustainability challenges (e.g., "Reduce community plastic use by 20% in one month," "Collective 500km cycling challenge"). These challenges could be predefined or customizable by community administrators. 

   - To foster friendly competition and motivation, leaderboards should be implemented, showcasing achievements at both individual (within a community, based on reduction efforts or points) and inter-community levels. 

   - Gamification elements, such as badges, points, or virtual rewards, should be considered to acknowledge and incentivize user participation in achieving personal goals, contributing to community challenges, and maintaining consistent sustainable actions.5. Knowledge Sharing and Communication: 

   - Within community spaces, the application must provide mechanisms for users to share sustainability tips, educational resources, links to relevant articles, or information about local green initiatives. 

   - An activity feed or forum within communities could allow members to see anonymized or permission-based updates on achievements, completed challenges, or newly shared resources from fellow members, fostering a sense of collective endeavor. 

6. (Bonus Feature) Predictive Impact Analysis for Communities: 
   - Develop a feature that uses Al to analyze current community engagement, participation in challenges, and stated goals to provide a forecast of the community's potential collective carbon reduction over a defined period.

  ## 📦 Setup Instructions

# Clone the repo
git clone https://github.com/MehakYahya/Ecomate-PuCon25Web-Hackathon.git
# Backend Setup
cd Ecomate-PuCon25Web-Hackathon/ecomate/backend
npm install
node server.js

# Frontend Setup
cd Ecomate-PuCon25Web-Hackathon/ecomate/frontend
npm install
ng serve

## 🚀 Demo & Screenshots

![register](https://github.com/user-attachments/assets/5b9144d5-2029-454a-b55e-71ca56563755)
![dashboard](https://github.com/user-attachments/assets/3b2c6695-810b-4f54-b80d-c4e0bbea0f06)
![log activity](https://github.com/user-attachments/assets/b4ccb056-1990-4699-bd43-c16676cd9bd9)
![activity history](https://github.com/user-attachments/assets/d694a7ef-db30-49f8-94bd-b52f2ff14ca5)
![Community](https://github.com/user-attachments/assets/93189dc2-a207-4ea1-8f40-bb7b2c69a4d1)
![community forecast](https://github.com/user-attachments/assets/e9d7a267-5e9e-4588-af67-c57e2a9000bc)
![community challenges](https://github.com/user-attachments/assets/ef27e725-1e4c-45cf-a5b8-4a4f6c547df7)
![create new challenge](https://github.com/user-attachments/assets/ca5f09c5-3dcf-4f73-a8f5-977a1b565fc4)
![join challnege](https://github.com/user-attachments/assets/bc1ad853-fed6-4bcb-8d8d-9199b8ebaf54)
![chllnege contribbuted](https://github.com/user-attachments/assets/0c9ee5bf-4d0f-4a8d-b12a-f94230c891c0)
![community leaderboard](https://github.com/user-attachments/assets/a8da0f97-883b-49ab-9226-040d77b58639)
![eco feed](https://github.com/user-attachments/assets/d51ee0c4-51f1-4c51-8fa8-690dfce38f56)
