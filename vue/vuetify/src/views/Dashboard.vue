<template>
    <div class="dashboard">
        <h1 class="subheading grey--text">Dashboard</h1>

        <v-container class='my-5'>
            <v-layout row class='mb-3'>
                <v-tooltip top>
                    <v-btn small flat color="grey" @click="sortBy('title')" slot="activator">
                        <v-icon left small>folder</v-icon>
                        <span class="caption text-lowercase"> by project name</span>
                    </v-btn>

                    <span>Sort Projects by project name</span>
                </v-tooltip>

                <v-tooltip top>
                    <v-btn small flat color="grey" @click="sortBy('person')" slot="activator">
                        <v-icon left small>person</v-icon>
                        <span class="caption text-lowercase"> by person</span>
                    </v-btn>

                    <span> Sort projects by person</span>
                </v-tooltip>
            </v-layout>

            <v-card flat v-for="project in projects" :key="project.id">
                <v-layout row wrap :class="`pa-3 project ${project.status}`">
                    <v-flex xs12 md6>
                        <div class="caption grey--text">Project Title</div>
                        <div>{{project.title}}</div>
                    </v-flex>

                    <v-flex xs6 sm4 md2>
                        <div class="caption grey--text">Person</div>
                        <div>{{project.person}}</div>
                    </v-flex>

                    <v-flex xs6 sm4 md2>
                        <div class="caption grey--text">Due date</div>
                        <div>{{project.dueDate}}</div>
                    </v-flex>

                    <v-flex xs2 sm4 md2>
                        <div class="right">
                            <v-chip small :class="`${project.status} white--text caption my-2`">{{project.status}}
                            </v-chip>
                        </div>
                    </v-flex>
                </v-layout>

                <v-divider></v-divider>

            </v-card>
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
                        status: 'ongoing'
                    },
                    {
                        id: 2,
                        title: 'Project Two',
                        person: 'Person Two',
                        dueDate: '15 Jan 2018',
                        status: 'complete'
                    },
                    {
                        id: 3,
                        title: 'Project Three',
                        person: 'Person Three',
                        dueDate: '21 Apr 2020',
                        status: 'overdue'
                    },
                    {
                        id: 4,
                        title: 'Project Four',
                        person: 'Person Four',
                        dueDate: '10 Dec 2015',
                        status: 'complete'
                    }
                ]
            };
        },
        methods: {
            sortBy( param ) {
                this.projects.sort(( a, b ) => {
                    if (a[ param ] > b[ param ]) return 1;
                    else if (a[ param ] < b[ param ]) return -1;
                    else return 0;
                });
            }
        }
    };
</script>

<style>
    .project.complete {
        border-left: 4px solid lightgreen;
    }

    .project.ongoing {
        border-left: 4px solid orange;
    }

    .project.overdue {
        border-left: 4px solid orangered;
    }

    .v-chip.complete {
        background: lightgreen;
    }

    .v-chip.ongoing {
        background: orange;
    }

    .v-chip.overdue {
        background: tomato;
    }


</style>
