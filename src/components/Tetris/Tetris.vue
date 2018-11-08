<template>
    <div class="tetris">
        <div v-for="(row, index) of arena" :key="index" class="tetris-row">
            <div v-for="(column, index) of row" :key="index" :class="['tetris-column', { active: column }]">
                <div class="tetris-item" v-if="false"></div>
            </div>
        </div>
    </div>
</template>

<script src="./Tetris.js"></script>
<style lang="scss" scoped src="./Tetris.scss"></style>


