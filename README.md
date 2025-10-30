# Keep Dishes Going

A food delivery platform connecting restaurants and customers, providing seamless integration between restaurant management for owners and real-time ordering experiences for customers.

---

## 🧠 Challenges & Accomplishments

### **Challenges**
- Integrating **MapStruct** introduced unnecessary complexity for straightforward entity–domain mappings. Creating custom mapping logic required careful handling of domain events and JPA entities to avoid circular dependencies.
- Establishing robust **message broker communication (RabbitMQ)** between bounded contexts and delivery service. Determining which services should consume or publish events and managing transactional outbox consistency across modules was a significant challenge.
- Ensuring **synchronized state** across contexts (restaurant, order, delivery) while maintaining DDD boundaries required detailed architectural design.
- Learning and applying **TanStack Query (React Query)** for real-time state management on the frontend. Handling query invalidation, background refetching, and cache synchronization was initially complex.

### **Accomplishments**
- Built **real-time synchronization** between backend domain events and frontend UI, allowing customers to instantly see restaurant open/close status and live order tracking.
- Implemented **draft-based editing for dishes**, enabling owners to safely modify dishes without affecting the published menu until explicitly pushed live.
- Developed a **rich DDD domain model** with clear aggregates, value objects, and entities, ensuring business logic consistency and expressiveness.
- Applied **hexagonal architecture**, fully decoupling the domain, application, and infrastructure layers across contexts.
- Achieved **transactional consistency** across restaurant and order services via event sourcing and projection synchronization.
- Delivered a **clean modular frontend** using React, Vite, TypeScript, and Material UI with React Query for data synchronization and caching.

---

## ✅ Finished Features

- Sync open/close status (#14)  
- Edit a dish as a draft without affecting the live menu (#29)  
- Track order status (#9)  
- Delivery team updates order status (#12)  
- Delivery team receives ready notification (#11)  
- Mark accepted orders ready for pickup (#35)  
- Manually open/close restaurant (#37)  
- Mark dish out of stock or back in stock immediately (#34)  
- Lock order after checkout (#7)  
- Checkout with customer details (#6)  
- Restrict basket to one restaurant (#5)  
- Manage basket (#3)  
- See item availability (#2)  
- Browse restaurant menus (#1)  
- Explore restaurants in a list or on a map (#16)  
- Landing page allowing customer continuation (#15)  
- Publish or unpublish a dish (#31)  
- Create a dish via draft and publish it (#36)  
- Create restaurant with address, contact, cuisine, and opening hours (#28)  
- Owner authentication and access to management area (#27)

---

## ❌ Unfinished / Planned Features

- Schedule batch publish/unpublish operations (#33)  
- Prevent checkout when closed (#8)  
- Apply all pending dish changes in one action (#32)  
- Notify basket changes (#4)  
- Adjust price range criteria (KDG configuration) (#26)  
- Estimate delivery time based on distance, prep time, and busyness (#19)  
- Track price range evolution of restaurants (#23)  
- Integrate payment provider for checkout (#21)  
- Add sorting options for dishes (e.g., by price) (#18)  
- Add restaurant filtering (by cuisine, price, distance, delivery time) (#17)  
- Display rejection reason for rejected orders (#10)  
- Automatically decline unaccepted orders (#13)

---

## 🏗️ Architectural Highlights

- **Backend:** Spring Boot, PostgreSQL, RabbitMQ, Keycloak for authentication, and Spring Modulith for event publication and transaction synchronization.  
- **Frontend:** React (Vite + TypeScript), React Query for data synchronization, and Material UI for component styling.  
- **Design:** DDD-oriented hexagonal architecture with clear bounded contexts for Restaurant, Order, and Delivery.  
- **Integration:** Event-driven communication and projections keep customer-facing UIs updated dynamically with minimal latency.

---

## 🚀 Summary

**Keep Dishes Going** demonstrates a clean integration of event-driven backend architecture and dynamic frontend synchronization.  
It emphasizes modularity, strong domain boundaries, and an elegant user experience for both restaurant owners and customers.

