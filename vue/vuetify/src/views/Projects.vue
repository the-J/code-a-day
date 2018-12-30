<template>
    <div class="projects">
        <h1 class="subheading grey--text">Projects</h1>

        <v-container class='my-5'>
            <v-expansion-panel>
                <v-expansion-panel-content v-for="project in myProjects" :key="project.id">
                    <div slot="header">{{project.title}}</div>

                    <v-card>
                        <v-card-text class="px-4 grey--text">
                            <div class="font-weight-bold">{{project.dueDate}}</div>
                            <div>{{project.content}}</div>
                        </v-card-text>
                    </v-card>
                </v-expansion-panel-content>
            </v-expansion-panel>

        </v-container>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                projects: [
                    {
                        id: 1,
                        title: 'Project One',
                        person: 'Person One',
                        dueDate: '1 Feb 2020',
                        status: 'ongoing',
                        content: 'AAAAAAAAAAA'
                    },
                    {
                        id: 2,
                        title: 'Project Two',
                        person: 'Person Three',
                        dueDate: '15 Jan 2018',
                        status: 'complete',
                        content: 'VVVVVVVVVVVVV'
                    },
                    {
                        id: 3,
                        title: 'Project Three',
                        person: 'Person Three',
                        dueDate: '21 Apr 2020',
                        status: 'overdue',
                        content: 'HHHHHHHHHHH'
                    },
                    {
                        id: 4,
                        title: 'Project Four',
                        person: 'Person Four',
                        dueDate: '10 Dec 2015',
                        status: 'complete',
                        content: 'EEEEEEE'
                    }
                ]
            };
        },
        computed: {
            myProjects() {
                return this.projects.filter(project => project.person === 'Person Three')
            }
        }
    };
</script>
