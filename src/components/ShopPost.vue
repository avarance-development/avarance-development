<template>
    <div class="post-wrapper">
        <div class="post-content">
            <h2 class="content-title">
                {{ post.title }}
            </h2>
            <p class="content-preview">
                {{ post.description }}
            </p>
            <router-link class="products-link" to="#">
                {{ post.linkTitle }}<Arrow  class="icon"/>
            </router-link>
        </div>
        <img class="photo" :src="require(`../assets/photos/${post.photoName}.jpg`)" alt="">
    </div>
</template>

<script>
import Arrow from "../assets/Icons/rightarrow.svg"
export default {
    name: "ShopPost",
    data() {
        return {

        }
    },
    props: ["post"],
    components: {
        Arrow,
    }
}
</script>

<style lang="scss" scoped>
.post-wrapper {
    display: flex;
    flex-direction: row;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    
    @media(max-width: 700px) {
        flex-direction: column;
        overflow: hidden;
    }
    align-items: center;
    order: 2;

    @media(max-width: 700px) {
        order: 1;
    }

    &:nth-child(even) {
        .post-content {
            order: 2;
        }
        .photo {
            order: 1;
        }
        @media(max-width: 700px) {
            .post-content {
                order: 1;
            }
            .photo {
                order: 2;
            }
        }
    }
    .post-content {
        width: 40vw;
        padding: 0 24px;
        display: flex;
        flex-direction: column;
        text-align: center;
        justify-content: center;
        align-items: center;

        @media(max-width: 700px) {
            width: 100%;
            min-height: 30vh;
        }
        .content-title {
            color: #000;
            text-transform: uppercase;
            font-size: 2rem;
            font-weight: 300;
            margin-bottom: 16px;
            
            @media(max-width: 700px) {
                margin-top: 12px;
                margin-bottom: 8px;
            }
        }

        .content-preview {
            font-size: 1.23rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: gray;
        }
        
        .products-link {
            color: #000;
            display: inline-flex;
            text-decoration: none;
            font-size: 1.125rem;
            text-transform: uppercase;
            margin-top: 24px;
            border-bottom: 1px solid transparent;
            padding-bottom: -2px;
            transition: 0.5s ease-in border;
            white-space: nowrap;
            &:hover {
                border-bottom-color: #000;
                
            }
            
            @media(max-width: 700px) {
                margin-top: 16px;
            }

            .icon {
                position: relative;
                bottom: 1.5px;
                @media(max-width: 700px) {
                    bottom: 4px;
                }

                @media(max-width: 900px) {
                    bottom: 3.5px;
                }
            }

        }
    }

    .photo {
        max-width: 60vw;    
        overflow: hidden;
        @media(max-width: 700px) {
            max-width: 100vw;
            object-fit: cover;
            min-width: 100vw;
            max-height: 100vh;
        }
    }
}
</style>