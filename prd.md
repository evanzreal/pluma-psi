## 1. Introduction

Pluma is a Software as a Service (SAAS) platform designed to enhance the relationship between psychologists and their patients. By providing tools for patient management, data collection, and analysis, Pluma aims to improve patient outcomes and streamline workflows for psychologists. The platform offers a user-friendly interface for both psychologists and patients, facilitating communication and engagement in the treatment process.

---

## 2. Goals and Objectives

- **Primary Goal:** Create a platform that enables psychologists to effectively monitor and manage their patients while empowering patients with insights into their progress.
- **Objectives:**
  - Simplify patient registration and management for psychologists.
  - Collect and analyze regular patient data through a clinical instrument.
  - Deliver actionable data visualizations and insights for both user groups.
  - Provide timely alerts to psychologists based on patient data patterns.

---

## 3. Target Audience

- **Psychologists:** Professionals who need efficient tools to manage multiple patients, track progress, and identify critical conditions.
- **Patients:** Individuals undergoing psychological treatment who seek to actively participate in their care by tracking their well-being.

---

## 4. Features and Requirements

### 4.1. Authentication and User Management

- **Psychologists:**
  - Sign up using email/password or social login via Clerk.
  - Select from 2-3 subscription plans (monthly or annual options).
  - Log in to access the dashboard.
- **Patients:**
  - Receive a unique code from their psychologist.
  - Use the code for initial account setup, then log in with personal credentials.
- **Technical Requirements:**
  - Integrate Clerk for secure authentication.
  - Define distinct user roles: psychologist and patient.

### 4.2. Psychologist Dashboard

- **Overview:**
  - Display total active patients and recent alerts.
- **Patient Management:**
  - Register new patients and generate unique codes for them.
  - View a list of active patients with key details (e.g., last update, alert status).
- **Patient Profile:**
  - Detailed view with clinical instrument data.
  - Visualizations such as charts and graphs of patient responses.
  - Synthesized insights and trends (e.g., mood patterns).
- **Alerts Tab:**
  - Show notifications triggered by patient data analysis.
- **Technical Requirements:**
  - Build frontend using Next.js.
  - Retrieve data from Supabase backend.

### 4.3. Patient Interface

- **Login:**
  - Initial access via unique code, followed by credential-based login.
- **Clinical Instrument:**
  - Daily questionnaire with an intuitive, simple design.
- **Personal Dashboard:**
  - Visual display of personal data (e.g., mood trends over time).
- **Settings:**
  - Options to update profile details and preferences.
- **Technical Requirements:**
  - Ensure mobile-friendly design for future app compatibility.

### 4.4. Data Management

- **Database:**
  - Utilize Supabase (PostgreSQL) to store user data, patient profiles, responses, and alerts.
- **Data Processing:**
  - Process patient responses to generate metrics and trigger alerts.
- **Security:**
  - Encrypt sensitive data in transit and at rest.
  - Implement role-based access control to restrict data access.

### 4.5. Subscription Plans

- **Plans:**
  - Provide 2-3 tiers with varying features and pricing (e.g., patient limits, analytics depth).
- **Feature Gating:**
  - Limit access to specific functionalities based on the chosen plan.

### 4.6. Alert System

- **Generation:**
  - Analyze patient data periodically (e.g., daily) to identify alert-worthy patterns.
- **Notification:**
  - Display alerts in the psychologist's dashboard under a dedicated tab.

### 4.7. Data Visualization

- **Psychologist View:**
  - Detailed charts and metrics for individual patient analysis.
- **Patient View:**
  - Simplified visualizations of personal progress (e.g., line graphs of mood scores).

### 4.8. Security and Privacy

- **Compliance:**
  - Adhere to data protection standards (e.g., GDPR, HIPAA if applicable).
- **Access Control:**
  - Restrict psychologists to their own patients' data; limit patients to their own profiles.
- **Encryption:**
  - Secure all data with industry-standard encryption protocols.

### 4.9. User Interface

- **Design:**
  - Develop a responsive web application using Next.js.
  - Prioritize intuitive navigation and accessibility (WCAG 2.1 compliance).
- **Language:**
  - Launch with Portuguese support; design for future localization.

---

## 5. Technical Stack

- **Authentication:** Clerk  
- **Backend:** Supabase (Managed Cloud Platform)  
- **Frontend:** Next.js  

---

## 6. Success Criteria

- **User Adoption:** Measure the number of active psychologists and patients.
- **Engagement:** Track frequency of patient submissions and psychologist interactions.
- **Alert Effectiveness:** Assess reduction in unnoticed critical patient conditions.
- **Customer Satisfaction:** Gather user feedback on usability and perceived value.

---

## 7. Timeline and Milestones

- **Phase 1:** Develop core functionality (authentication, patient management, clinical instrument).
- **Phase 2:** Implement data visualization and alert system.
- **Phase 3:** Integrate subscription plans and feature gating.
- **Phase 4:** Conduct testing, finalize deployment, and launch. 