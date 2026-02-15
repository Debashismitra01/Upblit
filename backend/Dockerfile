# ---------- Stage 1: Build ----------
FROM maven:3.9.9-eclipse-temurin-21 AS build

WORKDIR /app

# Copy pom first for caching dependencies
COPY pom.xml .
RUN mvn -B -q -e -DskipTests dependency:go-offline

# Copy source code
COPY src ./src

# Build jar
RUN mvn clean package -DskipTests


# ---------- Stage 2: Run ----------
FROM eclipse-temurin:21-jdk-jammy

WORKDIR /app

# Copy jar from build stage
COPY --from=build /app/target/*.jar app.jar

# Expose default Spring port
EXPOSE 8080

# Run Spring Boot
ENTRYPOINT ["java","-jar","app.jar"]
