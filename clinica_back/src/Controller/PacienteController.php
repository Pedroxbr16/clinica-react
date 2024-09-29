<?php

namespace App\Controller;

use App\Entity\Paciente;
use App\Form\PacienteType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;





class PacienteController extends AbstractController
{
    /**
     * @Route("/pacientes", name="paciente_create", methods={"POST"})
     */
    public function create(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $paciente = new Paciente();
        
        // Criar o formulário e lidar com a requisição
        $form = $this->createForm(PacienteType::class, $paciente);
        $form->handleRequest($request);
        
        if ($form->isSubmitted() && $form->isValid()) {
            // Lidar com o upload da foto (se houver)
            $foto = $form['foto']->getData();
            if ($foto) {
                $novoNomeArquivo = uniqid() . '.' . $foto->guessExtension();
                
                // Mover o arquivo para o diretório configurado (pasta "uploads" por exemplo)
                $foto->move(
                    $this->getParameter('uploads_directory'), // Defina o diretório em config/services.yaml
                    $novoNomeArquivo
                );
                
                // Definir o nome do arquivo na entidade
                $paciente->setFoto($novoNomeArquivo);
            }

            // Persistir a entidade no banco de dados
            $entityManager->persist($paciente);
            $entityManager->flush();

            return new JsonResponse(['message' => 'Paciente cadastrado com sucesso!'], Response::HTTP_CREATED);
        }

        return new JsonResponse(['error' => 'Dados inválidos'], Response::HTTP_BAD_REQUEST);
    }
}
