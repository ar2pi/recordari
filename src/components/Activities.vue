<template>
  <md-theme md-name="recordari">
    <div class="full-height doc-content-wrapper">

      <md-layout class="full-height sp-hinset" id="doc-login" v-show="!initialized">
        <md-layout md-vertical-align="center" md-align="center">
          <div>
            <h3 class="md-display-2 text-center">Ingreso al espacio de docente</h3>
            <form style="width:100%;max-width:600px;" novalidate @submit.stop.prevent="submit">
              <md-input-container>
                <label>Codigo de ingreso (1234)</label>
                <md-input v-model="loginCode"></md-input>
              </md-input-container>
              <md-button class="md-accent" @click.prevent="submit">Ingresar</md-button>
            </form>
          </div>
        </md-layout>
      </md-layout>

      <div id="doc-content" class="clearfix" v-show="initialized"
           style="opacity:0;">

        <p class="md-display-3 text-center">GUÍA DOCENTE</p>
        <p>
          Recordari es una herramienta para promover y facilitar la apropiación y construcción de la memoria histórica del conflicto armado en Colombia entre las y los adolescentes que cursen grado 9, 10 y 11 de educación media. A su vez, como una herramienta pedagógica para las y los docentes que guíen la Cátedra de la Paz en los mismos grados de formación, en particular con el tema de memoria histórica y reconciliación.</p>
        <p>
          Este “módulo docente” está diseñado para ayudarte en el abordaje del tema de la memoria histórica y reconciliación que propone la Cátedra de la Paz, así que vas a encontrar información, recursos y herramientas para motivar el diálogo con los alumnos, entre los alumnos y entre estos y otras personas como sus padres, familiares y amigos.</p>
        <p>
          El propósito es darte pistas para promover la apropiación y construcción de la memoria histórica del conflicto armado de Colombia con los alumnos a través de una serie de actividades cortas y prácticas que les despierte el interés de conocer las dimensiones del conflicto y construir memoria histórica.</p>
        <p>
          Tu rol como docente está ligado a tus conocimientos, habilidades y actitudes puestas al servicio de las y los adolescentes desde el conocimiento de las causas y consecuencias del conflicto armado hasta aportar a la construcción de la memoria histórica.</p>
        <p>
          Tu misión es crear la atmósfera adecuada para facilitar tu diálogo con las y los alumnos y entre estos, para darle el tratamiento adecuado al tema y evitar tergiversaciones, estigmatizaciones o rectivimizaciones no deseadas.</p>

        <p class="text-center"><span class="md-display-2">¿Cómo se estructura Recordari?</span></p>
        <p>
          Esta herramienta pedagógica está formada por tres ejes temáticos relacionados con el conflicto armado: Conciencia, Reconciliación y Reparación en formato interactivo, que guían paso a paso a las y los alumnos a conocimiento del conflicto y a la apropiación y construcción de la memoria histórica.</p>

        <span class="md-display-1">Conciencia</span>
        <p>
          Este eje temático describe los hechos acaecidos durante el conflicto armado, se evidencian los hechos victimizantes haciendo énfasis en los adolescentes.</p>

        <span class="md-display-1">Reconciliación</span>
        <p>
          Este eje temático describe la importancia que tiene tanto para las víctimas como para el proceso de paz lograr la reconciliación entre las víctimas y sus victimarios y entre todos los colombianos para garantizar la no repetición.</p>

        <span class="md-display-1">Reparación</span>
        <p>
          Este eje temático describe los mecanismos que deben orientar los actos de reparación por parte de los victimarios hacia las víctimas para compensar los daños causados.</p>

        <span class="md-display-1">Time-Line</span>
        <p>
          Este recurso describe los principales hechos que marcaron el rumbo del conflicto armado en el territorio nacional desde 1964 hasta 2017.</p>

        <p class="text-center"><span class="md-display-2">Tu rol como docente facilitador</span></p>
        <p>
          Debes lograr que las y los adolescentes se sientan cómodos y cercanos a ti durante las sesiones de formación.</p>

        <p>
          Para lograrlo, es muy importante que establezcas sus necesidades de aprendizaje respecto a los contenidos que vas a ofrecer. Saber qué y cuánto saben del tema.
        <p>

        <p>
          Tener en cuenta sus características socioeconómicas (edad, dónde y cómo viven, origen o procedencia) y culturales (hábitos y costumbres, preferencias, actitudes y expectativas).</p>

        <p>
          Así podrás encontrar el tono y las palabras adecuadas para hablarles llanamente, sin tecnicismos, y si resulta indispensable usarlos, se los podrás explicar con palabras conocidas y ejemplos de su vida cotidiana que faciliten su apropiación.</p>

        <p>
          Estos conocimientos previos te ayudarán a interpretar tu rol como facilitador-a de manera tolerante y asertiva, asumiendo las particularidades especiales en cuanto al aprendizaje de los distintos grupos de adolescentes.</p>

        <p>
          Es fundamental que tu rol de facilitador-a te genere un sentimiento de satisfacción, basado en comprender que de esta manera estás contribuyendo a la apropiación y construcción de la memoria histórica del conflicto.</p>


        <p class="text-center"><span class="md-display-2">Principios de la Cátedra de la Paz</span></p>

        <p>
          Recuerda que el Ministerio de Educación Nacional sugiere en la guía “Orientaciones Generales para la Implementación de la Cátedra de la Paz” los siguientes principios orientadores:</p>

        <ul>
          <li>
            Partir de lo construido: es fundamental que tengas en cuenta y consultar experiencias que hayan sido lideradas por ti misma-o o por otros docentes en tu institución educativa o en otras instituciones respecto a la construcción de memoria histórica.
          </li>
          <li>
            Oportunidad: así como la Cátedra de la Paz, Recordari también representa una oportunidad adicional para que promuevas la reflexión y la construcción de escenarios en torno a la paz desde tu escuela.
          </li>
          <li>
            Autonomía: como docente facilitador puedes decidir libremente la manera como tú y tus estudiantes pueden adoptar Recordari como estrategia pedagógica para complementar el desarrollo de la Cátedra de la Paz.
          </li>
          <li>
            Diversidad: teniendo en cuenta el contexto socio-económico y socio-político de tu escuela en general y del grupo de estudiantes en particular, puedes definir la manera de ir desarrollando los contenidos y las actividades académicas que propone Recordari. Por lo tanto, estas en libertad en promover actividades en espacios formales (el aula o la escuela) o espacios no formales (sitios históricos o interacción con la familia) o integrarlas con otras áreas académicas o proyectos transversales (matemáticas, cálculo, geografía, lenguaje, educación artística).
          </li>
        </ul>

        <p class="text-center"><span class="md-display-2">Resultados esperados</span></p>
        <p>De la exploración de Recordari se esperan los siguientes resultados:</p>

        <ul>
          <li>
            Estimular y fomentar el diálogo asertivo en torno a las causas y consecuencias del conflicto armado y el aporte a la construcción de la memoria histórica.
          </li>
          <li>
            Generar conciencia del papel que la memoria histórica cumple en conocer la verdad, la no repetición y en la consolidación de una cultura de la paz estable y duradera.
          </li>
        </ul>

        <p class="text-center"><span class="md-display-2">Contextualización</span></p>
        <p>
          La memoria histórica es la forma en que miembros de una sociedad recrean su pasado. La construcción de la memoria histórica ayuda a los ciudadanos a consolidar los lazos de identidad y pertenencia con su comunidad, su barrio, su familia y, en fin, con instancias de sociabilidad en las cuales comparten vivencias comunes. Lo anterior permite construir un tejido social fuerte en el que los individuos velan por el desarrollo de su comunidad y garantizan la convivencia y la paz, al tiempo que les permite defender sus derechos y los de su grupo social.</p>

        <p>
          Por ser una construcción humana, la memoria histórica implica un sentido de responsabilidad entre quienes la enuncian, ya que muchas veces responde a los intereses de sectores poderosos que acallan las voces de los demás grupos sociales. Por ello, la memoria histórica tiende a convertirse en un discurso hegemónico que perdura de generación en generación, y que es rebatido por sectores subalternos. Ante esto, se hace necesario “darle voz a aquellos que no tienen voz”, escucharlos e identificar los procesos sociales que se establecen en torno a las comunidades.</p>

        <p>
          En nuestro país, un ejemplo claro es la labor realizada por el Centro Nacional de Memoria Histórica (CNMH), institución oficial que amparada en la Ley de Víctimas (Ley 1448 de 2011), unifica y analiza las memorias plurales de los protagonistas del conflicto armado como perpetradores, víctimas y sociedad civil, con el objetivo de no olvidar los hechos de violencia sucedidos durante un conflicto armado y garantizar que no se repitan.</p>

        <p>
          A partir de los aprendizajes logrados por esta institución se busca que, así mismo, los ciudadanos aprendan cuáles son las consecuencias que pueden generar el odio, la violencia y la discriminación.</p>

        <p>
          En los últimos años, la construcción de la memoria histórica ha adquirido trascendencia en las instituciones escolares. Con esto, se busca que la comunidad estudiantil aprenda, por medio de la experiencia de investigación, aspectos como la importancia de los lazos de pertenencia, el fomento de valores como la tolerancia y el respeto por los derechos humanos.</p>

        <p>Fuente: <em>Santillana – Universidad Javeriana. (2016). Guía para la implementación de la Cátedra de la Paz. Bogotá. Pág. 23.</em>
        </p>


        <p class="md-display-3 text-center">ACTIVIDADES ACADÉMICAS</p>

        <span class="md-display-2">CONCIENCIA</span>
        <div class="sm-valign-wrapper">
          <div class="sp-hinset">
            <span class="md-title">Actividad Académica 1: Conociendo lo Fundamental</span>
          </div>
          <div class="">
            <a href="static/docs/activity1.pdf" download>
              <md-button class="md-accent">
                <md-icon class="md-accent">picture_as_pdf</md-icon>
                Descargar pdf
              </md-button>
            </a>
          </div>
        </div>

      </div>
    </div>
  </md-theme>
</template>

<script>
  import * as VueMaterial from 'vue-material'
  import anime from 'animejs'
  import Vue from 'vue'
  import MdLayout from "../../node_modules/vue-material/src/components/mdLayout/mdLayout.vue";

  export default {
    components: {MdLayout},
    name: 'ap-activities',
    methods: {
      submit() {
        if (this.loginCode === this.secretCode) {
          let self = this;
          anime({
            targets: '#doc-login',
            opacity: 0,
            duration: 600,
            easing: 'easeOutCubic',
            complete() {
              self.initialized = true;
              anime({
                targets: '#doc-content',
                opacity: 1,
                duration: 600,
                easing: 'easeOutCubic'
              });
            }
          });
        }
      }
    },
    mounted() {
      console.log(this.initialized);
    },
    data() {
      return {
        loginCode: '',
        secretCode: '1234',
        initialized: false
      }
    }
  }
</script>

<style scoped>
  .doc-content-wrapper {
    background-color: #f9f9f9;
  }

  #doc-content {
    margin: 0 auto;
    padding: 0 16px;
    max-width: 750px;
    border-left: 2px solid rgba(0, 0, 0, .2);
    border-right: 2px solid rgba(0, 0, 0, .2);
  }
</style>
