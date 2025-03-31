# To-Do List for Pluma SAAS Development

## 1. Authentication and User Management
- [ ] Integrate Clerk for authentication (email/password and social login).
- [ ] Define user roles in Clerk: psychologist and patient.
- [ ] Implement psychologist sign-up flow:
  - [ ] Create sign-up form with email, password, and role selection.
  - [ ] Allow selection of subscription plans (2-3 tiers, monthly/annual).
- [ ] Implement psychologist login flow.
- [ ] Implement patient account setup:
  - [ ] Create a process for patients to enter the unique code provided by the psychologist.
  - [ ] Set up patient credentials after initial code validation.
- [ ] Implement patient login flow using credentials.
- [ ] Add email verification for new sign-ups (both psychologists and patients).
- [ ] Ensure secure handling of sensitive data (e.g., passwords, personal information).

## 2. Psychologist Dashboard
- [ ] Set up the main dashboard page using Next.js.
- [ ] Create an overview section:
  - [ ] Display the total number of active patients.
  - [ ] Show recent alerts or notifications.
- [ ] Implement patient management features:
  - [ ] Create a form to register new patients.
  - [ ] Generate a unique code for each new patient.
  - [ ] Develop a list view for active patients with key details (e.g., name, last update, alert status).
- [ ] Build the patient profile page:
  - [ ] Display clinical instrument data (responses from questionnaires).
  - [ ] Integrate data visualizations (e.g., charts, graphs) using a library like Chart.js or Recharts.
  - [ ] Add synthesized insights and trends (e.g., mood patterns over time).
- [ ] Create the alerts tab:
  - [ ] Display notifications based on patient data analysis.
  - [ ] Ensure alerts are filterable or sortable by date or patient.
- [ ] Ensure all dashboard components fetch data from Supabase.

## 3. Patient Interface
- [ ] Implement the patient login page:
  - [ ] Initial access via unique code.
  - [ ] Subsequent logins using credentials.
- [ ] Develop the clinical instrument page:
  - [ ] Create a daily questionnaire with an intuitive design.
  - [ ] Ensure the form is simple and easy to complete.
- [ ] Build the personal dashboard:
  - [ ] Display visualizations of the patient's data (e.g., mood trends).
  - [ ] Ensure the interface is user-friendly and accessible.
- [ ] Create the settings page:
  - [ ] Allow patients to update profile details (e.g., name, photo).
  - [ ] Add options for managing preferences (e.g., notification settings).
- [ ] Ensure the interface is mobile-friendly for future app compatibility.

## 4. Data Management
- [ ] Set up Supabase (PostgreSQL) as the backend database.
- [ ] Define the database schema:
  - [ ] Users Table: id, email, role (psychologist/patient), created_at, plano_id (for psychologists).
  - [ ] Plans Table: id, nome (e.g., Basic, Premium), preço, periodicidade (monthly/annual), features.
  - [ ] Patients Table: id, psicologo_id, nome, codigo_unico, created_at.
  - [ ] Responses Table: id, paciente_id, data, respostas (JSON with questionnaire answers).
  - [ ] Alerts Table: id, psicologo_id, paciente_id, mensagem, data, lido (boolean).
- [ ] Implement data processing logic:
  - [ ] Create functions to analyze patient responses and generate metrics.
  - [ ] Develop algorithms to detect patterns that trigger alerts (e.g., consecutive negative responses).
- [ ] Ensure data security:
  - [ ] Encrypt sensitive data in transit and at rest.
  - [ ] Implement role-based access control to restrict data access.

## 5. Subscription Plans
- [ ] Define 2-3 subscription tiers with varying features (e.g., patient limits, analytics depth).
- [ ] Implement subscription selection during psychologist sign-up.
- [ ] Develop feature gating:
  - [ ] Restrict access to certain features based on the selected plan.
- [ ] Set up subscription management:
  - [ ] Allow psychologists to view and change their subscription plan.
  - [ ] Handle subscription renewals and cancellations.

## 6. Alert System
- [ ] Develop the alert generation logic:
  - [ ] Create a periodic analysis process (e.g., daily) to check patient data.
  - [ ] Define conditions for triggering alerts (e.g., multiple days of negative responses).
- [ ] Implement alert notifications:
  - [ ] Display alerts in the psychologist's dashboard under the alerts tab.
  - [ ] Ensure alerts are marked as read once viewed.

## 7. Data Visualization
- [ ] Implement visualizations for the psychologist's patient profile:
  - [ ] Use libraries like Chart.js or Recharts to create detailed charts and metrics.
- [ ] Develop simplified visualizations for the patient's personal dashboard:
  - [ ] Create easy-to-understand graphs (e.g., line graphs for mood trends).
  - [ ] Ensure visualizations are interactive and responsive.

## 8. Security and Privacy
- [ ] Ensure compliance with data protection standards (e.g., GDPR, HIPAA if applicable).
- [ ] Implement role-based access control:
  - [ ] Restrict psychologists to their own patients' data.
  - [ ] Limit patients to their own profiles.
- [ ] Use encryption for sensitive data:
  - [ ] Secure data in transit using HTTPS.
  - [ ] Encrypt sensitive fields in the database.

## 9. User Interface
- [ ] Design a responsive web application using Next.js.
- [ ] Prioritize intuitive navigation:
  - [ ] Create a clear menu structure for both psychologists and patients.
- [ ] Ensure accessibility compliance (WCAG 2.1):
  - [ ] Use semantic HTML and ARIA labels.
  - [ ] Test with screen readers and other accessibility tools.
- [ ] Implement Portuguese language support:
  - [ ] Design the UI with localization in mind for future language additions.

## 10. Testing and Deployment
- [ ] Conduct unit testing for critical functions (e.g., alert generation, subscription gating).
- [ ] Perform integration testing between frontend and backend.
- [ ] Test usability with simulated psychologists and patients.
- [ ] Set up CI/CD pipelines for automated deployment (e.g., using Vercel for Next.js).
- [ ] Configure monitoring and logging for error tracking and analytics.
- [ ] Plan for regular backups of the Supabase database.

## 11. Documentation and Maintenance
- [ ] Document the codebase and architecture.
- [ ] Create user guides for psychologists and patients.
- [ ] Plan for regular updates based on user feedback.
- [ ] Schedule periodic security audits and compliance checks. 