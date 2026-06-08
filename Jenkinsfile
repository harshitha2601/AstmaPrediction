pipeline {
    agent any

    stages {

        stage('Build') {
            steps {
                bat '"D:\\harshitha\\Astma_predictor\\backend\\venv\\Scripts\\python.exe" --version'
            }
        }

        stage('Test') {
            steps {
                bat '"D:\\harshitha\\Astma_predictor\\backend\\venv\\Scripts\\python.exe" -m py_compile app.py'
            }
        }

        stage('Deploy') {
            steps {
                bat 'echo Deployment Successful'
            }
        }
    }
}