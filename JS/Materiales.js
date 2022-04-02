var UrlGetMateriales='http://52.152.236.67:90/G3_20/controller/materiales.php?opcion=GetMateriales';
var UrlGetMaterial='http://52.152.236.67:90/G3_20/controller/materiales.php?opcion=GetMaterial';
var UrlInsertMaterial='http://52.152.236.67:90/G3_20/controller/materiales.php?opcion=InsertMaterial';
var UrlUpdateMaterial='http://52.152.236.67:90/G3_20/controller/materiales.php?opcion=UpdateMaterial';
var UrlDeleteMaterial='http://52.152.236.67:90/G3_20/controller/materiales.php?opcion=DeleteMaterial';

$(document).ready(function(){
CargarMateriales();
});

function CargarMateriales(){
    $.ajax({
        url:UrlGetMateriales,
        type:'GET',
        datatype:'JSON',
        success:function(response){
            var MiItems=response;
            var Valores='';

            for(i=0;i<MiItems.length;i++){
                Valores+='<tr>'+
                '<td>'+MiItems[i].ID+'</td>'+
                '<td>'+MiItems[i].DESCRIPCION+'</td>'+
                '<td>'+MiItems[i].UNIDAD+'</td>'+
                '<td>'+MiItems[i].COSTO+'</td>'+
                '<td>'+MiItems[i].PRECIO+'</td>'+
                '<td>'+MiItems[i].APLICA_ISV+'</td>'+
                '<td>'+MiItems[i].PORCENTAJE_ISV+'</td>'+
                '<td>'+MiItems[i].ESTADO+'</td>'+
                '<td>'+MiItems[i].ID_SOCIO+'</td>'+
                '<td>'+
                '<button class="btn btn-outline-success" onclick="CargarMaterial('+MiItems[i].ID+')">Editar</button>'+
                '<button class="btn btn-outline-danger"  onclick="EliminarMaterial('+MiItems[i].ID+')">Eliminar</button>'+
                '</td>'+
            '</tr>';
            $('.respuesta').html(Valores);
            }
        }
    });
}

function AgregarMaterial(){
    var datosmaterial={
        ID:$('#ID').val(),
        DESCRIPCION:$('#DESCRIPCION').val(),
        UNIDAD:$('#UNIDAD').val(),
        COSTO:$('#COSTO').val(),
        PRECIO:$('#PRECIO').val(),
        APLICA_ISV:$('#APLICA_ISV').val(),
        PORCENTAJE_ISV:$('#PORCENTAJE_ISV').val(),
        ESTADO:$('#ESTADO').val(),
        ID_SOCIO:$('#ID_SOCIO').val()
    };

    var datosmaterialjson=JSON.stringify(datosmaterial);
    $.ajax({
        url:UrlInsertMaterial,
        type:'POST',
        data:datosmaterialjson,
        dataType:'JSON',
        contenttype:'application/json',
        success:function(response){
            console.log(response);
        },
        error:function(){
            alert('Error al crear material');
        }
    });
    alert('Material Agregado');
}

function CargarMaterial(idmaterial){
    var datosmaterial={
        ID:idmaterial
    };

    var datosmaterialjson=JSON.stringify(datosmaterial);
    $.ajax({
        url:UrlGetMaterial,
        type:'POST',
        data:datosmaterialjson,
        datatype:'JSON',
        contenttype:'application/json',
        success:function(response){
            var MiItems=response;
            $('#ID').val(MiItems[0].ID);
            $('#DESCRIPCION').val(MiItems[0].DESCRIPCION);
            $('#UNIDAD').val(MiItems[0].UNIDAD);
            $('#COSTO').val(MiItems[0].COSTO);
            $('#PRECIO').val(MiItems[0].PRECIO);
            $('#APLICA_ISV').val(MiItems[0].APLICA_ISV);
            $('#PORCENTAJE_ISV').val(MiItems[0].PORCENTAJE_ISV);
            $('#ESTADO').val(MiItems[0].ESTADO);
            $('#ID_SOCIO').val(MiItems[0].ID_SOCIO);
            var btnactualizar='<input type="submit" id="btnactualizar" onclick="ActualizarMaterial('+MiItems[0].ID+')" value="Actualizar Material" class="btn btn-outline-primary"></input>';
            $('#btnmaterial').html(btnactualizar);
        },
        error:function(){
            alert('Error al buscar material')}
    });
}

function ActualizarMaterial(idmaterial){
    var datosmaterial={
        ID:idmaterial,
        DESCRIPCION:$('#DESCRIPCION').val(),
        UNIDAD:$('#UNIDAD').val(),
        COSTO:$('#COSTO').val(),
        PRECIO:$('#PRECIO').val(),
        APLICA_ISV:$('#APLICA_ISV').val(),
        PORCENTAJE_ISV:$('#PORCENTAJE_ISV').val(),
        ESTADO:$('#ESTADO').val(),
        ID_SOCIO:$('#ID_SOCIO').val()
    };

    var datosmaterialjson=JSON.stringify(datosmaterial);
    $.ajax({
        url:UrlUpdateMaterial,
        type:'PUT',
        data:datosmaterialjson,
        dataType:'JSON',
        contenttype:'application/json',
        success:function(response){
            console.log(response);
        },
        error:function(){
            alert('Error al actualizar material');
        }
    });
    alert('Material Actualizado');
}

function EliminarMaterial(idmaterial){
    var datosmaterial={
        ID:idmaterial
    };

        var datosmaterialjson=JSON.stringify(datosmaterial);
        $.ajax({
            url:UrlDeleteMaterial,
            type:'DELETE',
            data:datosmaterialjson,
            dataType:'JSON',
            contenttype:'application/json',
            success:function(response){
                console.log(response);
            },
            error:function(){
                alert('Error al borrar material');
            }
        });
        alert('Material Borrado');
}